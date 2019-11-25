var express = require('express')
var consign = require('consign')

const app = express()

consign({ cwd: 'app' })
  .include('config')
  .then('lib/express-middlewares.js')
  .then('db/models/index.js')
  .then('route')
  .then('lib/boot.js')
  .into(app)
