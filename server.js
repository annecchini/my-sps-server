var express = require('express')
var consign = require('consign')

const app = express()

consign({ cwd: 'app' })
  .include('config')
  .then('libs/express-middlewares.js')
  .then('db/models/index.js')
  .then('routes')
  .then('libs/boot.js')
  .into(app)
