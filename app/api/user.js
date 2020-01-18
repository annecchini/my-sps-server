'use strict'

const { idNotFoundErrorMessage, generateValidationErrorMessage, generateUnauthorizedErrorMessage } = require('../lib/error-helpers')
const { validateBody, validateAuth, validateAuthorizedAuth } = require('../validation/user')
const jwt = require('jsonwebtoken')
const jwtConf = require('../../config/jwt')

module.exports = app => {
  const db = app.db.models.index
  const api = {}
  const error = app.error.user

  api.list = (req, res) => {
    db.User.findAll({ order: [['login', 'ASC']] }).then(
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
    const errors = await validateBody(req.body, db, 'create')
    if (errors) {
      return res.status(400).json(error.parse('user-400', generateValidationErrorMessage(errors)))
    }

    //try to create
    try {
      const created = await db.User.create(req.body)
      return res.status(201).json(created)
    } catch (e) {
      return res.status(500).json(error.parse('user-500', e))
    }
  }

  api.read = async (req, res) => {
    const toRead = await db.User.findByPk(req.params.id)

    //verify valid id
    if (!toRead) {
      return res.status(400).json(error.parse('user-400', idNotFoundErrorMessage()))
    }

    //return result
    return res.json(toRead)
  }

  api.update = async (req, res) => {
    const toUpdate = await db.User.findByPk(req.params.id)

    //verify valid id
    if (!toUpdate) {
      return res.status(400).json(error.parse('user-400', idNotFoundErrorMessage()))
    }

    //validation
    const errors = await validateBody(req.body, db, 'update', toUpdate)
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
    const toDelete = await db.User.findByPk(req.params.id)

    //verify valid id
    if (!toDelete) {
      return res.status(400).json(error.parse('user-400', idNotFoundErrorMessage()))
    }

    //try to delete
    try {
      db.User.destroy({ where: { id: req.params.id }, individualHooks: true }).then(_ => res.sendStatus(204))
    } catch (e) {
      if (e.name === 'DeleteAssociatedError') {
        return res.status(403).json(error.parse('graduationLevel-403', e))
      }
      return res.status(500).json(error.parse('user-500', e))
    }
  }

  return api
}
