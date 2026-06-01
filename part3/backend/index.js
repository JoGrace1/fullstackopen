require('dotenv').config()
const http = require('http')
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const Persons = require('./models/persons')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan('tiny'))

// let persons = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     },
//     { 
//       "id": "5",
//       "name": "Steffi Schalitz", 
//       "number": "61-49-6423122"
//     },
//     { 
//       "id": "6",
//       "name": "Steffis Schalitz", 
//       "number": "61-49-6423122"
//     }
// ]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })
app.get('/', (request, response) => {
  response.send("Welcome to phonebook")
})

app.get('/api/persons', (request, response) => {
  Persons.find({}).then(persons => {
      response.json(persons)
  }).catch(error => {
    console.error(error)
    response.status(500).end()
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
        error: 'name missing'
    })
  }
  // const existingPerson = persons.find(p => p.name === body.name)
  // if(existingPerson){
  //   return (
  //     response.status(400).json({
  //       error: 'name must be unique'
  //     })
  //   )
  // }

  const person = new Persons({
    name: body.name,
    number: body.number
  })
  person.save().then(person => {
    response.json(person)
  }).catch(error => {
    console.log(error)
    next(error)
  })
})

app.get('/info', (request, response)=>{
  const entries = Persons.length
  const time = new Date
  response.send(`
  <p>Phonebook has infos about ${entries} persons</p>
  <p>${time}</p>
  `)
})
app.get('/api/persons/:id', (request, response, next) =>{
  Persons.findById(request.params.id).then(person => {
    if (person) response.json(person)
      else response.status(404).end()
  }).catch(error => {
    next(error)
    console.log(error)
    //response.status(400).send({ error: 'malformatted id' })
  })
})
app.delete('/api/persons/:id', (request, response, next) => {
  Persons.findByIdAndDelete(request.params.id)
    .then(result => {
      if(result) response.status(204).end()
      else response.status(404).end()
    })
    .catch(error => next(error))
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })  
}

  next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
