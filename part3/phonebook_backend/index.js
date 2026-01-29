require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const phoneNumber = require('./models/phonenumber')

// 1. Core Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// 2. Logging Configuration
morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// 3. Health Check (Explicitly for Fly-proxy)
app.get('/health', (req, res) => {
  res.send('ok')
})

// 4. API Routes
app.get('/api/persons', (request, response, next) => {
  phoneNumber.find({}).then(persons => response.json(persons)).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  phoneNumber.findById(request.params.id)
    .then(person => person ? response.json(person) : response.status(404).end())
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  phoneNumber.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${new Date()}</p>`)
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  phoneNumber.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }
  const entry = new phoneNumber({ name: body.name, number: body.number })
  entry.save().then(result => response.json(result)).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  phoneNumber.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(result => res.json(result))
    .catch(error => next(error))
})

// 5. Error Handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' })
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, '::', () => {
  console.log(`Server running on port ${PORT}`)
})