
const phoneNumber = require('./models/phonenumber')
const cors = require('cors')

const express = require('express')
const app = express()

const morgan  = require('morgan')

app.use(cors())

app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
))

// GET requests

app.get('/api/persons', (request, response, next) => {
    phoneNumber.find({}).then(persons => {
        response.json(persons)
    })
    .catch(error => { next(error) })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    phoneNumber.findById(id).then(person => {
         if (person) {
        response.json(person)
        } else {
        response.status(404).end()
        }
    })
    .catch(error => { next(error) })
})

app.get('/info', (request, response, next) => {
    phoneNumber.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people.</p>\n${Date()}</p>`)
    })
    .catch(error => { next(error) })
})

// DELETE requests
app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    phoneNumber.findByIdAndDelete(id).then( () => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

//middleware
app.use(express.static('dist'))
app.use(express.json())


morgan.token('body', req => {
  return JSON.stringify(req.body)
})

// POST requests
app.post('/api/persons/', (request, response, next) => {

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
    .catch(error => { next(error) })
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  const updatedPerson = {
    name,
    number
  }

  phoneNumber.findByIdAndUpdate(
    req.params.id,
    updatedPerson,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})