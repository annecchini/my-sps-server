const express = require('express')
const consign = require('consign')

const app = express()

consign({ cwd: 'app', locale: 'pt-br' })
  .include('lib/express-middlewares.js')
  .then('db/models/index.js')
  .then('error')
  .then('api')
  .then('routes')
  .then('lib/boot.js')
  .into(app)
