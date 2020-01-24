'use strict'

const Validator = require('validator')

const validateName = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is unique
  if (typeof value !== 'undefined') {
    const whereIgnoreOwnId = mode === 'update' ? { id: { [db.Sequelize.Op.not]: item.id } } : {}
    const permissions = await db.Permission.findAll({
      where: { name: value, ...whereIgnoreOwnId }
    })
    if (permissions.length > 0) {
      return 'Já existe uma permissão com esse nome.'
    }
  }
}

const validateDescription = (value, db, mode, item) => {
  //value is not empty
  if (typeof value !== 'undefined' && value === null) {
    return 'Este campo não pode ser nulo.'
  }
}

const validateGlobal = (value, db, mode, item) => {
  //value is booblean
  if (typeof value !== 'undefined' && (value === '' || (value != true && value != false))) {
    return 'Formato inválido.'
  }
}

const validateMethod = (value, db, mode, item) => {
  //value é um dos valores permitidos.
  const methods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']
  if (typeof value !== 'undefined' && value !== null && !Validator.isIn(value, methods)) {
    return 'Se for declarado, deve ser um method válido.'
  }
}

const validateUrn = (value, db, mode, item) => {}

const validateBody = async (body, db, mode, item) => {
  let errors = []

  const nameError = await validateName(body.name, db, mode, item)
  if (nameError) {
    errors.push({ message: nameError, path: 'name' })
  }

  const descriptionError = validateDescription(body.description, db, mode, item)
  if (descriptionError) {
    errors.push({ message: descriptionError, path: 'description' })
  }

  const globalError = validateGlobal(body.global, db, mode, item)
  if (globalError) {
    errors.push({ message: globalError, path: 'global' })
  }

  const methodError = validateMethod(body.method, db, mode, item)
  if (methodError) {
    errors.push({ message: methodError, path: 'method' })
  }

  const urnError = validateUrn(body.urn, db, mode, item)
  if (urnError) {
    errors.push({ message: urnError, path: 'urn' })
  }

  return errors.length > 0 ? errors : null
}

const validateDelete = async (permission, models) => {
  const errors = []

  //validate RolePermissions constraint
  const rolePermissions = await models.RolePermission.findAll({
    where: { permission_id: permission.id }
  })
  if (rolePermissions.length > 0) {
    errors.push({ message: 'Esta permissão está associada a papeis ativos.', path: 'id' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody, validateDelete }
