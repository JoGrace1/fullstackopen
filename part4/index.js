require('dotenv').config()
const app = require('./app') // the actual Express application
//const config = require('./utils/config')
//const logger = require('./utils/logger')

app.listen(process.env.PORT, () => {
  console.info(`Server running on port ${process.env.PORT}`)
})
