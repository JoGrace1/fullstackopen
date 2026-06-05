require('dotenv').config()
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
    app.listen(config.PORT, () => {
      logger.info(`server running on port ${config.PORT}`)
    })
  })
  .catch((err) => {
    logger.error('MongoDB connection error:', err.message)
  })
