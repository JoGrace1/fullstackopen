const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

app.use(express.static('dist'))
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.use(middleware.requestLogger)

module.exports = app
