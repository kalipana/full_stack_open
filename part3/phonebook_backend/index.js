const express = require('express')
const morgan = require('morgan')
const app = express() 

app.use(express.json())

morgan.token('post', function (req, res) { 
    if (req.body.name) {
        return JSON.stringify(req.body)
    }
    return ""
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const num_persons = persons.length
    console.log(num_persons)
    const d = new Date()
    console.log(d)
    response.send(`<p>Phonebook has info for ${num_persons} people</p><p>${d}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const exists = persons.find(person => person.id === id)
    console.log(exists)
    if (!exists) {
        return response.status(400).json({
            error: "id does not exist in phonebook"
        })
    }

    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if ((!body.name) || (!body.number)) {
        return response.status(400).json({
            error: "content missing"
        })
    }

    if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({
            error: "This name already exists in the phonebook"
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})