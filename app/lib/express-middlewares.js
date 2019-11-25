const helmet = require('helmet')
const bodyParser = require('body-parser')

module.exports = app => {
  const corsMiddleware = () => (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-Methods', '*')
    next()
  }

  app.set('json spaces', 4)
  app.use(corsMiddleware())
  app.use(helmet())
  app.use(bodyParser.json())
}
