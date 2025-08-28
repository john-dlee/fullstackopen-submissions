const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

//app.use(cors({ origin: 'http://localhost:5173'}))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

let notes = [
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

const generateId = () => {
  return String(Math.floor(Math.random() * 1000000) + 1)
}

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/info', (request, response) => {
  const now = new Date()

  response.send(`
    <div>Phonebook has info for ${notes.length} people</div>
    <p>${now.toString()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = notes.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  const found = notes.find(person => person.name === body.name)

  if (found) {
    return response.status(400).json({
      error: 'name already exists'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  notes = notes.concat(person)
  response.json(notes)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})