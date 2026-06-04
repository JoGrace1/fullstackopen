const express = require('express')
const mongoose = require('mongoose')
// const config = require('./utils/config')
// const logger = require('./utils/logger')
// const middleware = require('./utils/middleware')
// const notesRouter = require('./controllers/notes')
const Blog = require('./models/blog')

const app = express()

console.info('connecting to', process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI, { family: 4 })
  .then(() => {
    console.info('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then(post =>
        response.json(post)
    )
})
//app.use(middleware.requestLogger)

//app.use('/api/blogs', )

//app.use(middleware.unknownEndpoint)
//app.use(middleware.errorHandler)

module.exports = app
