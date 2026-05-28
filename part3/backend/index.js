const http = require('http')
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan('tiny'))
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
    },
    { 
      "id": "5",
      "name": "Steffi Schalitz", 
      "number": "61-49-6423122"
    },
    { 
      "id": "6",
      "name": "Steffis Schalitz", 
      "number": "61-49-6423122"
    }
]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })
app.get('/', (request, response) => {
  response.send("Welcome to phonebook")
})
app.get('/api/persons', (request, response) =>{
  response.json(persons)
})
app.post('/api/persons', (request, response) => {
  if (!request.body.name) {
    return response.status(400).json({
        error: 'name missing'
    })
  }
  const existingPerson = persons.find(p => p.name === request.body.name)
  if(existingPerson){
    return (
      response.status(400).json({
        error: 'name must be unique'
      })
    )
  }
  const ranId = Math.floor(Math.random()*100000)+1
  //(...persons.map(p => Number(p.id)))
  const newPerson = request.body
  newPerson.id = String(ranId)
  persons = persons.concat(newPerson)
  response.json(persons)
})

app.get('/info', (request, response)=>{
  const entries = persons.length
  const time = new Date
  response.send(`
  <p>Phonebook has infos about ${entries} persons</p>
  <p>${time}</p>
  `)
})
app.get('/api/persons/:id', (request, response) =>{
  const person = persons.find(p => p.id === request.params.id)
  response.json(person)
})
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
