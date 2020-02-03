'use strict'

const {
  idNotFoundErrorMessage,
  generateValidationErrorMessage,
  generateUnauthorizedErrorMessage
} = require('../lib/error-helpers')
const { validateBody, validatePermission } = require('../validation/process')

module.exports = app => {
  const db = app.db.models.index
  const api = {}
  const error = app.error.process

  api.list = (req, res) => {
    //Recolher parametros de paginação.

    //Recolher parametros de filtros.

    //Aplicar parametros e filtros.

    //

    db.Process.findAll({ order: [['createdAt', 'DESC']] }).then(
      Processes => {
        return res.json(Processes)
      },
      e => {
        return res.status(500).json(error.parse('process-500', e))
      }
    )
  }

  api.create = async (req, res) => {
    //validation
    const errors = await validateBody(req.body, db, 'create')
    if (errors) {
      return res.status(400).json(error.parse('process-400', generateValidationErrorMessage(errors)))
    }

    //permission
    const permissionErrors = validatePermission(req, db, null)
    if (permissionErrors) {
      return res.status(401).json(error.parse('process-401', generateUnauthorizedErrorMessage(permissionErrors)))
    }

    //try to create
    try {
      const created = await db.Process.create(req.body)
      return res.status(201).json(created)
    } catch (e) {
      return res.status(500).json(error.parse('process-500', e))
    }
  }

  api.read = async (req, res) => {
    const toRead = await db.Process.findByPk(req.params.id)

    //verify valid id
    if (!toRead) {
      return res.status(400).json(error.parse('process-400', idNotFoundErrorMessage()))
    }

    //return result
    return res.json(toRead)
  }

  api.update = async (req, res) => {
    const toUpdate = await db.Process.findByPk(req.params.id)

    //verify valid id
    if (!toUpdate) {
      return res.status(400).json(error.parse('process-400', idNotFoundErrorMessage()))
    }

    //permission
    const permissionErrors = validatePermission(req, db, toUpdate)
    if (permissionErrors) {
      return res.status(401).json(error.parse('process-401', generateUnauthorizedErrorMessage(permissionErrors)))
    }

    //validation
    const errors = await validateBody(req.body, db, 'update', toUpdate)
    if (errors) {
      return res.status(400).json(error.parse('process-400', generateValidationErrorMessage(errors)))
    }

    //try to update
    try {
      const updated = await toUpdate.update(req.body, {
        fields: Object.keys(req.body)
      })
      return res.json(updated)
    } catch (e) {
      return res.status(500).json(error.parse('process-500', e))
    }
  }

  api.delete = async (req, res) => {
    const toDelete = await db.Process.findByPk(req.params.id)

    //verify valid id
    if (!toDelete) {
      return res.status(400).json(error.parse('process-400', idNotFoundErrorMessage()))
    }

    //permission
    const permissionErrors = validatePermission(req, db, toDelete)
    if (permissionErrors) {
      return res.status(401).json(error.parse('process-401', generateUnauthorizedErrorMessage(permissionErrors)))
    }

    //try to delete
    try {
      await db.Process.destroy({ where: { id: req.params.id }, individualHooks: true }).then(_ => res.sendStatus(204))
    } catch (e) {
      if (e.name === 'ForbbidenDeletionError') {
        return res.status(403).json(error.parse('process-403', e))
      }
      return res.status(500).json(error.parse('process-500', e))
    }
  }

  return api
}
