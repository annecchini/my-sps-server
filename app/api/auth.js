'use strict'

const { generateValidationErrorMessage, generateUnauthorizedErrorMessage } = require('../lib/error-helpers')
const { validateBody, validateAuthorizedAuth } = require('../validation/auth')
const jwt = require('jsonwebtoken')
const jwtConf = require('../../config/jwt')

module.exports = app => {
  const db = app.db.models.index
  const api = {}
  const error = app.error.auth

  api.authenticate = async (req, res) => {
    //validation
    const validationErrors = await validateBody(req.body, db)
    if (validationErrors) {
      return res.status(400).json(error.parse('auth-400', generateValidationErrorMessage(validationErrors)))
    }

    //authorization
    const authorizedErrors = await validateAuthorizedAuth(req.body.login, db)
    if (authorizedErrors) {
      return res.status(401).json(error.parse('auth-401', generateUnauthorizedErrorMessage(authorizedErrors)))
    }

    //send the token to the user
    const user = await db.User.findOne({ where: { login: req.body.login } })
    let access_token = jwt.sign({ data: user.id }, jwtConf.jwt_secret, jwtConf.options)
    return res.json({ access_token, userMessage: 'Authentication success' })
  }

  return api
}
