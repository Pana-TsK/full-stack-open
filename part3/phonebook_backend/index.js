const express = require('express')
const app = express()

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
]

// GET requests

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people.</p>\n${Date()}`)
})

// DELETE requests
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(persons => persons.id !== id)

    response.status(204).end()
})

// POST requests
app.use(express.json())

const getRandomId = () => {
    return Math.floor(Math.random() * 1000000000)
}

app.post('/api/persons/', (request, response) => {
    const person = request.body
    const id = getRandomId()
    

    person.id = id
    persons = persons.concat(person)

    console.log(person) // console check for info
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})