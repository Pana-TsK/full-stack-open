const express = require('express')
const app = express()

const morgan  = require('morgan')

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

//middleware
app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
))

// POST requests
const getRandomId = () => {
    return Math.floor(Math.random() * 1000000000)
}

app.post('/api/persons/', (request, response) => {
    const person = request.body
    const id = getRandomId()
    
    if (!person.name || !person.number) {
        console.log("name or numer field is not filled!")
        return response.status(400).json({
            'error': 'content is missing'
        })
    }

    if (persons.filter(persons => persons.name == person.name).length !== 0) {
        console.log("the person name is already in the phonebook!")
        return response.status(400).json({
            'error': 'name is already in the file.'
        })
    }

    person.id = id
    persons = persons.concat(person)

    console.log(person) // console check for info
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})