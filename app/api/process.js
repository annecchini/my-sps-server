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
    req.query.limit = req.query.limit > 100 ? 100 : req.query.limit * 1 || 10
    req.query.page = req.query.page * 1 || 1
    req.query.offset = (req.query.page - 1) * req.query.limit

    //Recolher parametros de filtros.
    const whereYears = req.query.year ? { year: validYears(req.query.years) } : {}
    const whereCourseIdsFromGraduationLevelIds = {}
    let whereCourseIds = req.query.courses ? { course_id: validIds(req.query.courses) } : {}
    const whereProcessIdsFromAssignmentIds = {}

    //Definir que processos ocultos serão exibidos baseado no login.
    let whereAccess = {}
    if (req.user) {
    } else {
      whereAccess = { visible: true }
    }

    //Pesquisar processos, montar resultado e enviar.
    models.SelectiveProcess.findAndCountAll({
      include: [],
      distinct: true,
      limit: req.query.limit,
      offset: req.query.offset,
      page: req.query.page,
      where: { ...whereYears, ...whereCourseIds },
      order: [
        ['year', 'DESC'],
        ['identifier', 'DESC']
      ]
    }).then(
      selectiveProcesses =>
        res.json({
          info: {
            count: selectiveProcesses.count,
            currentPage: req.query.page ? req.query.page * 1 : 1,
            numberOfPages: Math.ceil(selectiveProcesses.count / req.query.limit)
          },
          selectiveProcesses: selectiveProcesses.rows.map(injectAssignmentAndRemoveVacancies)
        }),
      e => {
        res.status(500).json(error.parse('process-500', e))
      }
    )

    //antigo.
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
