'use strict'

const {
  idNotFoundErrorMessage,
  generateValidationErrorMessage,
  generateUnauthorizedErrorMessage
} = require('../utils/error-helpers')
const { validateBody, validatePermission } = require('../validation/assignment')

module.exports = app => {
  const db = app.db.models.index
  const api = {}
  const error = app.error.assignment

  api.list = (req, res) => {
    db.Assignment.findAll({ order: [['name', 'ASC']] }).then(
      GraduationLevels => {
        return res.json(GraduationLevels)
      },
      e => {
        return res.status(500).json(error.parse('assignment-500', e))
      }
    )
  }

  api.create = async (req, res) => {
    //permission
    const permissionErrors = validatePermission(req, db)
    if (permissionErrors) {
      return res.status(401).json(error.parse('assignment-401', generateUnauthorizedErrorMessage(permissionErrors)))
    }

    //validation
    const errors = await validateBody(req.body, db, 'create')
    if (errors) {
      return res.status(400).json(error.parse('assignment-400', generateValidationErrorMessage(errors)))
    }

    //try to create
    try {
      const created = await db.Assignment.create(req.body)
      return res.status(201).json(created)
    } catch (e) {
      return res.status(500).json(error.parse('assignment-500', e))
    }
  }

  api.read = async (req, res) => {
    const toRead = await db.Assignment.findByPk(req.params.id)

    //verify valid id
    if (!toRead) {
      return res.status(400).json(error.parse('assignment-400', idNotFoundErrorMessage()))
    }

    //return result
    return res.json(toRead)
  }

  api.update = async (req, res) => {
    const toUpdate = await db.Assignment.findByPk(req.params.id)

    //verify valid id
    if (!toUpdate) {
      return res.status(400).json(error.parse('assignment-400', idNotFoundErrorMessage()))
    }

    //permission
    const permissionErrors = validatePermission(req, db)
    if (permissionErrors) {
      return res.status(401).json(error.parse('assignment-401', generateUnauthorizedErrorMessage(permissionErrors)))
    }

    //validation
    const errors = await validateBody(req.body, db, 'update', toUpdate)
    if (errors) {
      return res.status(400).json(error.parse('assignment-400', generateValidationErrorMessage(errors)))
    }

    //try to update
    try {
      const updated = await toUpdate.update(req.body, {
        fields: Object.keys(req.body)
      })
      return res.json(updated)
    } catch (e) {
      return res.status(500).json(error.parse('assignment-500', e))
    }
  }

  api.delete = async (req, res) => {
    const toDelete = await db.Assignment.findByPk(req.params.id)

    //verify valid id
    if (!toDelete) {
      return res.status(400).json(error.parse('assignment-400', idNotFoundErrorMessage()))
    }

    //permission
    const permissionErrors = validatePermission(req, db)
    if (permissionErrors) {
      return res.status(401).json(error.parse('assignment-401', generateUnauthorizedErrorMessage(permissionErrors)))
    }

    //try to delete
    try {
      await db.Assignment.destroy({ where: { id: req.params.id }, individualHooks: true }).then(_ =>
        res.sendStatus(204)
      )
    } catch (e) {
      if (e.name === 'ForbbidenDeletionError') {
        return res.status(403).json(error.parse('assignment-403', e))
      }
      return res.status(500).json(error.parse('assignment-500', e))
    }
  }

  return api
}
