const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const app = express();
let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.use(cors());
app.use(express.static('dist'));

// Middleware responsible for takes the raw data from the requests that are stored 
// in the request object, parses it into a JavaScript object and assigns it to the 
// request object as a new property body.
app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

morgan.token('postData', function (req, res, param) {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
});

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => Number(p.id)))
        : 0
    return String(maxId + 1)
}

app.get('/api/persons', (request, response) => {
    return response.status(200).json(persons)
});

app.get('/api/info', (request, response) => {
    return response.status(200).send(`
        <p>Phonebook has info for ${persons.length} people.</p>
        <p>${new Date()}</p>
   `);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id == id);

    if (!person) {
        return response.status(204).end();
    }

    return response.status(200).json(person);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const newPersons = persons.filter(p => p.id !== id);

    persons = newPersons;

    return response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.find(p => p.name == body.name)) {
        return response.status(403).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)

    return response.status(201).json(newPerson)
});

// Listner
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});