'use strict'

const {
  idNotFoundErrorMessage,
  generateValidationErrorMessage,
  generateUnauthorizedErrorMessage
} = require('../lib/error-helpers')
const {
  validYears,
  validIds,
  findUserByToken,
  allowedCourseIds,
  getCourseIdsByGraduationLevelIds
} = require('../lib/process-helpers')
const { validateBody, validatePermission } = require('../validation/process')
const { isAdmin, havePermission } = require('../lib/permission-system-helpers')

module.exports = app => {
  const db = app.db.models.index
  const api = {}
  const error = app.error.process
  const $or = db.Sequelize.Op.or // sequelize OR shortcut

  api.list = async (req, res) => {
    //Recolher parametros de paginação.
    req.query.limit = req.query.limit > 100 ? 100 : req.query.limit * 1 || 10
    req.query.page = req.query.page * 1 || 1
    req.query.offset = (req.query.page - 1) * req.query.limit

    //Recolher parametros de filtros.
    const whereYears = req.query.years ? { year: validYears(req.query.years) } : {}
    const CourseIds = req.query.courses ? validIds(req.query.courses) : []
    const CourseIdsFromGraduationLevelIds = req.query.graduationLevels
      ? getCourseIdsByGraduationLevelIds(validIds(req.query.graduationLevels))
      : []
    const whereProcessIdsFromAssignmentIds = {}

    //Fundir course_ids dos filtros Course e GraduationLevel
    const fusedCourseIds = [...new Set(CourseIds.concat(CourseIdsFromGraduationLevelIds))]
    const whereCourseIds = fusedCourseIds.length > 0 ? { course_id: fusedCourseIds } : {}

    //Definir que processos ocultos serão exibidos baseado no login.
    let whereAccess = {}
    const user = await findUserByToken(req.headers['x-access-token'], db)
    if (user) {
      const haveAdmin = isAdmin(user)
      const haveGlobalAccess = await havePermission({ user: user, permission: 'process_list', context: 'GLOBAL' })
      if (!haveAdmin && !haveGlobalAccess) {
        const idsAllowed = allowedCourseIds(user, 'selectiveprocess_list')
        whereAccess = { [$or]: [{ visible: true }, { course_id: idsAllowed }] }
      }
    } else {
      whereAccess = { visible: true }
    }

    //Pesquisar processos, montar resultado e enviar.
    db.Process.findAndCountAll({
      include: [],
      distinct: true,
      limit: req.query.limit,
      offset: req.query.offset,
      page: req.query.page,
      where: { ...whereYears, ...whereCourseIds, ...whereAccess },
      order: [
        ['year', 'DESC'],
        ['identifier', 'DESC']
      ]
    }).then(processes => {
      return (
        res.json({
          info: {
            count: processes.count,
            currentPage: req.query.page ? req.query.page * 1 : 1,
            numberOfPages: processes.count > 0 ? Math.ceil(processes.count / req.query.limit) : 1
          },
          Processes: processes.rows
        }),
        e => {
          return res.status(500).json(error.parse('process-500', e))
        }
      )
    })
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
