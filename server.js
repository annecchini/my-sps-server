const express = require('express')
const consign = require('consign')

const app = express()

consign({ cwd: 'app', locale: 'pt-br' })
  .include('error')
  .then('db/models/index.js')
  .then('api')
  .then('utils/express-middlewares.js')
  .then('routes')
  .then('utils/express-notfound-middleware.js')
  .then('utils/express-boot.js')
  .into(app)
