const helmet = require('helmet')
const bodyParser = require('body-parser')
const { invalidRequestErrorMessage } = require('./error-helpers')
const errorParser = require('../error/request')

module.exports = app => {
  const corsMiddleware = () => (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-Methods', '*')
    next()
  }

  const invalidRequestMiddleware = () => (err, req, res, next) => {
    if (err) {
      return res.status(400).json(errorParser().parse('request-400', invalidRequestErrorMessage(err)))
    } else {
      next()
    }
  }

  app.set('json spaces', 4)
  app.use(corsMiddleware())
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(invalidRequestMiddleware())
}
