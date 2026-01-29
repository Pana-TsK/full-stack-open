require('dotenv').config()
const phoneNumber = require('./models/phonenumber')

const express = require('express')
const app = express()

const cors = require('cors')
const morgan  = require('morgan')

app.use(cors())

// GET requests

app.get('/api/persons', (request, response) => {
    phoneNumber.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phoneNumber.findById(id).then(person => {
         if (person) {
        response.json(person)
        } else {
        response.status(404).end()
        }
    })
})

app.get('/info', (request, response) => {
    phoneNumber.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people.</p>\n${Date()}</p>`)
    })
})

// DELETE requests
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(persons => persons.id !== id)

    response.status(204).end()
})

//middleware
app.use(express.static('dist'))
app.use(express.json())


morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
))

// POST requests
app.post('/api/persons/', (request, response) => {

    console.log("grabbing request body")
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'content missing' })
    }

    const entry = new phoneNumber({
        name: body.name,
        number: body.number
    })

    entry.save().then(result => {
        response.json(result)
        console.log(`added ${body.name} number ${body.number} to notebook`)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})