require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3002
const app = express()
const Person = require('./models/person')
app.use(cors())
app.use(express.static('dist'))

// Middleware responsible for takes the raw data from the requests that are stored
// in the request object, parses it into a JavaScript object and assigns it to the
// request object as a new property body.
app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

morgan.token('postData', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

// API Methods
app.get('/api/persons', async (request, response, next) => {
  try {
    const persons = await Person.find({})

    return response.status(200).json(persons)
  }
  catch (e) {
    next(e)
  }
})

app.get('/api/info', async (request, response, next) => {
  try {
    const personsLength = await Person.countDocuments()

    return response.status(200).send(`
            <p>Phonebook has info for ${personsLength} people.</p>
            <p>${new Date()}</p>
        `)
  }
  catch (e) {
    next(e)
  }
})

app.get('/api/persons/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const person = await Person.findById(id)

    if (!person) {
      return response.status(404).end()
    }

    return response.status(200).json(person)
  }
  catch (e) {
    next(e)
  }
})

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    const id = request.params.id

    await Person.deleteOne({ _id: id })

    return response.status(204).end()
  }
  catch (e) {
    next(e)
  }
})

app.put('/api/persons/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const { name, number } = request.body

    if (!name || !number) {
      return response.status(400).json({
        error: 'content missing'
      })
    }

    await Person.findByIdAndUpdate(id,
      { name, number },
      { new: true, runValidators: true, context: 'query' })

    const person = await Person.findById(id)

    return response.status(200).json(person)
  }
  catch (e) {
    next(e)
  }
})

app.post('/api/persons', async (request, response, next) => {
  try {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({
        error: 'content missing'
      })
    }

    var person = await Person.findOne({ name: body.name })

    if (person) {
      return response.status(403).json({
        error: 'name must be unique'
      })
    }

    const newPerson = await Person.create({
      name: body.name,
      number: body.number
    })

    return response.status(201).json(newPerson)
  }
  catch (e) {
    next(e)
  }
})

// Error middleware
app.use((error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
})

// Listner
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})