import bugsnagMiddleware from './middleware/bugsnag'

const express = require('express')
const cors = require('cors')
const { connectDB } = require('./db')

let app = null

module.exports = async () => {
  if (app) {
    return app
  }

  app = express()

  // Connect Database
  await connectDB()

  // This must be the first piece of middleware in the stack.
  // It can only capture errors in downstream middleware
  if (process.env.NODE_ENV !== 'test') {
    app.use(bugsnagMiddleware.requestHandler)
  }

  // Init Middleware
  app.use(cors())
  app.use(express.json({ extended: false }))

  // Define Routes
  app.use('/api/users', require('./routes/api/users'))
  app.use('/api/auth', require('./routes/api/auth'))
  app.use('/api/profile', require('./routes/api/profile'))
  app.use('/api/pages', require('./routes/api/pages'))
  app.use('/api/accounts', require('./routes/api/accounts'))
  app.use('/api/error', require('./routes/api/error'))

  app.use('/api/error', require('./routes/api/error'))

  // This handles any errors that Express catches and must be the last middleware
  if (process.env.NODE_ENV !== 'test') {
    app.use(bugsnagMiddleware.errorHandler)
  }

  app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
  })

  return app
}
