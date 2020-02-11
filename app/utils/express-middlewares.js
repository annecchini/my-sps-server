const helmet = require('helmet')
const bodyParser = require('body-parser')
var cors = require('cors')
const { invalidRequestErrorMessage } = require('./error-helpers')
//const configSite = require('../../config/site')

module.exports = app => {
  const error = app.error.request

  const corsOptions = {
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
    methods: '*'
  }

  const invalidRequestMiddleware = () => (err, req, res, next) => {
    if (err) {
      return res.status(400).json(error.parse('request-400', invalidRequestErrorMessage(err)))
    } else {
      next()
    }
  }

  app.set('json spaces', 4)
  app.use(cors(corsOptions))
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(invalidRequestMiddleware())
}
