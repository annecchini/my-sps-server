'use strict'

const { idNotFoundErrorMessage, generateValidationErrorMessage, generateUnauthorizedErrorMessage } = require('../lib/error-helpers')
const { validateBody, validateAuth, validateAuthorizedAuth } = require('../validation/user')
const jwt = require('jsonwebtoken')
const jwtConf = require('../../config/jwt')

module.exports = app => {
  const models = app.db.models.index
  const api = {}
  const error = app.error.user

  api.list = (req, res) => {
    models.User.findAll({ order: [['login', 'ASC']] }).then(
      toList => {
        return res.json(toList)
      },
      e => {
        return res.status(500).json(error.parse('user-500', e))
      }
    )
  }

  api.create = async (req, res) => {
    //validation
    const errors = await validateBody(req.body, models, 'create')
    if (errors) {
      return res.status(400).json(error.parse('user-400', generateValidationErrorMessage(errors)))
    }

    //try to create
    try {
      const created = await models.User.create(req.body)
      return res.status(201).json(created)
    } catch (e) {
      return res.status(500).json(error.parse('user-500', e))
    }
  }

  api.read = async (req, res) => {
    const toRead = await models.User.findByPk(req.params.id)

    //verify valid id
    if (!toRead) {
      return res.status(400).json(error.parse('user-400', idNotFoundErrorMessage()))
    }

    //return result
    return res.json(toRead)
  }

  api.update = async (req, res) => {
    const toUpdate = await models.User.findByPk(req.params.id)

    //verify valid id
    if (!toUpdate) {
      return res.status(400).json(error.parse('user-400', idNotFoundErrorMessage()))
    }

    //validation
    const errors = await validateBody(req.body, models, 'update', toUpdate)
    if (errors) {
      return res.status(400).json(error.parse('user-400', generateValidationErrorMessage(errors)))
    }

    //try to update
    try {
      const updated = await toUpdate.update(req.body, {
        fields: Object.keys(req.body)
      })
      return res.json(updated)
    } catch (e) {
      return res.status(500).json(error.parse('user-500', e))
    }
  }

  api.delete = async (req, res) => {
    const toDelete = await models.User.findByPk(req.params.id)

    //verify valid id
    if (!toDelete) {
      return res.status(400).json(error.parse('user-400', idNotFoundErrorMessage()))
    }

    //try to delete
    try {
      models.User.destroy({ where: { id: req.params.id }, individualHooks: true }).then(_ => res.sendStatus(204))
    } catch (e) {
      return res.status(500).json(error.parse('user-500', e))
    }
  }

  api.authenticate = async (req, res) => {
    //validation
    const validationErrors = await validateAuth(req.body, models)
    if (validationErrors) {
      return res.status(400).json(error.parse('user-400', generateValidationErrorMessage(validationErrors)))
    }

    //authorization
    const authorizedErrors = await validateAuthorizedAuth(req.body.login, models)
    if (authorizedErrors) {
      return res.status(401).json(error.parse('user-401', generateUnauthorizedErrorMessage(authorizedErrors)))
    }

    //send the token to the user
    const user = await models.User.findOne({ where: { login: req.body.login } })
    let access_token = jwt.sign({ data: user.id }, jwtConf.jwt_secret, jwtConf.options)
    return res.json({ access_token, userMessage: 'Authentication success' })
  }

  return api
}
