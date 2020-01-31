'use strict'
const Validator = require('validator')
const { isAdmin, havePermission } = require('../lib/permission-system-helpers')

const validateIdentifier = (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }
}

const validateYear = (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is not empty
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is a year
  if (typeof value !== 'undefined' && !Validator.matches(value, /^\d{4}$/)) {
    return 'Formato inválido. Deve ser um ano no formato AAAA'
  }
}

const validateCourseId = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is not empty
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is on database
  if (typeof value !== 'undefined') {
    const course = await db.Course.findOne({
      where: { id: value }
    })
    if (!course) {
      return 'O curso não existe na base de dados.'
    }
  }
}

const validateVisible = (value, db, mode, item) => {
  //value is booblean
  if (typeof value !== 'undefined') {
    if ((value != true && value != false) || value === '') {
      return 'Formato inválido.'
    }
  }
}

const validateDescription = (value, db, mode, item) => {
  //value is not null
  if (typeof value !== 'undefined' && value === null) {
    return 'Este campo não pode ser nulo.'
  }
}

const validateUniqueIdentifierYear = async (body, db, mode, item, identifierError, yearError) => {
  if (!identifierError && !yearError) {
    //Decidir se vai ignorar propria id
    const whereIgnoreOwnId = mode === 'update' ? { id: { [db.Sequelize.Op.not]: item.id } } : {}

    //Decidir se vai usar body.identifier ou item.identifier
    const whereIdentifier = body.identifier ? { identifier: body.identifier } : { identifier: item.identifier }

    //Decidir se vai usar body.year ou item.year
    const whereYear = body.year ? { year: body.year } : { year: item.year }

    const processes = await db.Process.findAll({ where: { ...whereIdentifier, ...whereYear, ...whereIgnoreOwnId } })
    if (processes.length > 0) {
      return 'Essa combinação de identificador-ano já existe.'
    }
  }
}

const validateBody = async (body, db, mode, item) => {
  let errors = []

  const identifierError = validateIdentifier(body.identifier, db, mode, item)
  if (identifierError) {
    errors.push({ message: identifierError, path: 'identifier' })
  }

  const yearError = validateYear(body.year, db, mode, item)
  if (yearError) {
    errors.push({ message: yearError, path: 'year' })
  }

  const courseIdError = await validateCourseId(body.course_id, db, mode, item)
  if (courseIdError) {
    errors.push({ message: courseIdError, path: 'course_id' })
  }

  const visibleError = await validateVisible(body.visible, db, mode, item)
  if (visibleError) {
    errors.push({ message: visibleError, path: 'visible' })
  }

  const descriptionError = await validateDescription(body.description, db, mode, item)
  if (descriptionError) {
    errors.push({ message: descriptionError, path: 'description' })
  }

  const uniqueIdentifierYearError = await validateUniqueIdentifierYear(body, db, mode, item, identifierError, yearError)
  if (uniqueIdentifierYearError) {
    errors.push({ message: uniqueIdentifierYearError, path: 'id' })
  }

  return errors.length > 0 ? errors : null
}

const validateDelete = async (process, models) => {
  const errors = []

  //validate ProcessAssignments constraint
  const processAssignments = await models.ProcessAssignment.findAll({
    where: { process_id: process.id }
  })
  if (processAssignments.length > 0) {
    errors.push({ message: 'Este processo está associado a atribuições de cargo ativas.', path: 'id' })
  }

  return errors.length > 0 ? errors : null
}

const validatePermission = (req, db, item) => {
  const errors = []

  if (isAdmin(req.user)) {
    return null
  }

  //create case
  if (req.method === 'POST') {
    const globalPermission = havePermission({
      user: req.user,
      permission: 'process_create',
      context: 'GLOBAL'
    })
    if (globalPermission) return null

    const course_id = req.body ? (req.body.course_id ? req.body.course_id : '') : ''

    const coursePermission = havePermission({
      user: req.user,
      permission: 'process_create',
      context: 'COURSE',
      course_id: course_id
    })
    if (coursePermission) return null

    errors.push({ message: 'O usuário não tem permissão para criar um processo desse curso.', path: 'permission' })
    return errors.length > 0 ? errors : null
  }

  //update case
  if (req.method === 'PUT') {
    const globalPermission = havePermission({
      user: req.user,
      permission: 'process_update',
      context: 'GLOBAL'
    })
    if (globalPermission) return null

    const courseIdAtual = item.course_id
    const courseIdNova = req.body && req.body.course_id ? req.body.course_id : item.course_id
    const coursePermissionAtual = havePermission({
      user: req.user,
      permission: 'process_update',
      context: 'COURSE',
      course_id: courseIdAtual
    })
    const coursePermissionNova = havePermission({
      user: req.user,
      permission: 'process_update',
      context: 'COURSE',
      course_id: courseIdNova
    })
    if (coursePermissionAtual && coursePermissionNova) return null

    if (!coursePermissionAtual) {
      errors.push({
        message: 'O usuário não tem permissão para atualizar processo desse curso.',
        path: 'permission'
      })
    }
    if (!coursePermissionNova) {
      errors.push({
        message: 'O usuário não tem permissão para atualizar processo para esse curso.',
        path: 'permission'
      })
    }
    return errors.length > 0 ? errors : null
  }

  //delete case
  if (req.method === 'DELETE') {
    const globalPermission = havePermission({
      user: req.user,
      permission: 'process_delete',
      context: 'GLOBAL'
    })
    if (globalPermission) return null

    const course_id = item.course_id
    const coursePermission = havePermission({
      user: req.user,
      permission: 'process_delete',
      context: 'COURSE',
      course_id: course_id
    })
    if (coursePermission) return null

    errors.push({ message: 'O usuário não tem permissão para deletar processo desse curso.', path: 'permission' })
    return errors.length > 0 ? errors : null
  }
}

module.exports = { validateBody, validateDelete, validatePermission }
