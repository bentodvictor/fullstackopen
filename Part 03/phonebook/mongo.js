const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const userName = process.argv[3]
const userNumber = process.argv[4]

const url =
    `mongodb+srv://root:${password}@fso.zjrb0de.mongodb.net/?retryWrites=true&w=majority&appName=fso`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: userName,
  number: userNumber
})

if (userName && userNumber) {
  person.save().then(() => {
    console.log(`added ${userName} number ${userNumber} to phonebook`)
    mongoose.connection.close()
  })

  return
}

if (!userName && !userNumber) {
  console.log('phonebook:')
  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}