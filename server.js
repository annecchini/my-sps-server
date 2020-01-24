const express = require('express')
const consign = require('consign')

const app = express()

consign({ cwd: 'app', locale: 'pt-br' })
  .include('error')
  .then('db/models/index.js')
  .then('api')
  .then('lib/express-middlewares.js')
  .then('routes')
  .then('lib/express-notfound-middleware.js')
  .then('lib/express-boot.js')
  .into(app)
