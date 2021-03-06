'use strict'

const {
  idNotFoundErrorMessage,
  generateValidationErrorMessage,
  generateUnauthorizedErrorMessage
} = require('../utils/error-helpers')
const { validateBody, validatePermission } = require('../validation/processAssignment')
const { validIds } = require('../utils/process-helpers')

module.exports = app => {
  const db = app.db.models.index
  const api = {}
  const error = app.error.processAssignment

  api.list = (req, res) => {
    const processIds = req.query.process_ids ? validIds(req.query.process_ids) : []
    const whereProcessIds = processIds.length > 0 ? { process_id: processIds } : {}

    db.ProcessAssignment.findAll({ where: { ...whereProcessIds }, order: [['createdAt', 'DESC']] }).then(
      toList => {
        return res.json(toList)
      },
      e => {
        return res.status(500).json(error.parse('processAssignment-500', e))
      }
    )
  }

  api.create = async (req, res) => {
    //validation
    const errors = await validateBody(req.body, db, 'create')
    if (errors) {
      return res.status(400).json(error.parse('processAssignment-400', generateValidationErrorMessage(errors)))
    }

    //permission
    const permissionErrors = await validatePermission(req, db, null)
    if (permissionErrors) {
      return res
        .status(401)
        .json(error.parse('processAssignment-401', generateUnauthorizedErrorMessage(permissionErrors)))
    }

    //try to create
    try {
      const created = await db.ProcessAssignment.create(req.body)
      return res.status(201).json(created)
    } catch (e) {
      return res.status(500).json(error.parse('processAssignment-500', e))
    }
  }

  api.read = async (req, res) => {
    const toRead = await db.ProcessAssignment.findByPk(req.params.id)

    //verify valid id
    if (!toRead) {
      return res.status(400).json(error.parse('processAssignment-400', idNotFoundErrorMessage()))
    }

    //return result
    return res.json(toRead)
  }

  api.update = async (req, res) => {
    const toUpdate = await db.ProcessAssignment.findByPk(req.params.id)

    //verify valid id
    if (!toUpdate) {
      return res.status(400).json(error.parse('processAssignment-400', idNotFoundErrorMessage()))
    }

    //validation
    const errors = await validateBody(req.body, db, 'update', toUpdate)
    if (errors) {
      return res.status(400).json(error.parse('processAssignment-400', generateValidationErrorMessage(errors)))
    }

    //permission
    const permissionErrors = await validatePermission(req, db, toUpdate)
    if (permissionErrors) {
      return res
        .status(401)
        .json(error.parse('processAssignment-401', generateUnauthorizedErrorMessage(permissionErrors)))
    }

    //try to update
    try {
      const updated = await toUpdate.update(req.body, {
        fields: Object.keys(req.body)
      })
      return res.json(updated)
    } catch (e) {
      return res.status(500).json(error.parse('processAssignment-500', e))
    }
  }

  api.delete = async (req, res) => {
    const toDelete = await db.ProcessAssignment.findByPk(req.params.id)

    //verify valid id
    if (!toDelete) {
      return res.status(400).json(error.parse('processAssignment-400', idNotFoundErrorMessage()))
    }

    //permission
    const permissionErrors = await validatePermission(req, db, toDelete)
    if (permissionErrors) {
      return res
        .status(401)
        .json(error.parse('processAssignment-401', generateUnauthorizedErrorMessage(permissionErrors)))
    }

    //try to delete
    try {
      await db.ProcessAssignment.destroy({ where: { id: req.params.id }, individualHooks: true }).then(_ =>
        res.sendStatus(204)
      )
    } catch (e) {
      if (e.name === 'ForbbidenDeletionError') {
        return res.status(403).json(error.parse('processAssignment-403', e))
      }
      return res.status(500).json(error.parse('processAssignment-500', e))
    }
  }

  return api
}
