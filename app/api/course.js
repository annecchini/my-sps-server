'use strict'

const { idNotFoundErrorMessage, generateValidationErrorMessage } = require('../lib/error-helpers')
const { validateBody, validateDelete } = require('../validation/course')

module.exports = app => {
  const models = app.db.models.index
  const api = {}
  const error = app.error.course

  api.list = (req, res) => {
    models.Course.findAll({ order: [['name', 'ASC']] }).then(
      Courses => {
        return res.json(Courses)
      },
      e => {
        return res.status(500).json(error.parse('course-500', e))
      }
    )
  }

  api.create = async (req, res) => {
    //validation
    const errors = await validateBody(req.body, models, 'create')
    if (errors) {
      return res.status(400).json(error.parse('course-400', generateValidationErrorMessage(errors)))
    }

    //try to create
    try {
      const created = await models.Course.create(req.body)
      return res.status(201).json(created)
    } catch (e) {
      return res.status(500).json(error.parse('course-500', e))
    }
  }

  api.read = async (req, res) => {
    const toRead = await models.Course.findByPk(req.params.id)

    //verify valid id
    if (!toRead) {
      return res.status(400).json(error.parse('course-400', idNotFoundErrorMessage()))
    }

    //return result
    return res.json(toRead)
  }

  api.update = async (req, res) => {
    const toUpdate = await models.Course.findByPk(req.params.id)

    //verify valid id
    if (!toUpdate) {
      return res.status(400).json(error.parse('course-400', idNotFoundErrorMessage()))
    }

    //validation
    const errors = await validateBody(req.body, models, 'update', toUpdate)
    if (errors) {
      return res.status(400).json(error.parse('course-400', generateValidationErrorMessage(errors)))
    }

    //try to update
    try {
      const updated = await toUpdate.update(req.body, {
        fields: Object.keys(req.body)
      })
      return res.json(updated)
    } catch (e) {
      return res.status(500).json(error.parse('course-500', e))
    }
  }

  api.delete = async (req, res) => {
    const toDelete = await models.Course.findByPk(req.params.id)

    //verify valid id
    if (!toDelete) {
      return res.status(400).json(error.parse('course-400', idNotFoundErrorMessage()))
    }

    //validação de constraint
    const errors = await validateDelete(toDelete, models)
    if (errors) {
      return res.status(400).json(error.parse('graduationLevel-400', generateValidationErrorMessage(errors)))
    }

    //try to delete
    try {
      models.Course.destroy({ where: { id: req.params.id } }).then(_ => res.sendStatus(204))
    } catch (e) {
      return res.status(500).json(error.parse('course-500', e))
    }
  }

  return api
}
