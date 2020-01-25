'use strict'

const validateName = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is not empty
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is unique
  if (typeof value !== 'undefined') {
    const role = await db.Role.findAll({
      where: { name: value }
    })
    if (role.length > 0 && mode === 'update' && role.find(x => x.id !== item.id)) {
      return 'Já existe um papel com esse nome.'
    }
    if (role.length > 0 && mode !== 'update') {
      return 'Já existe um papel com esse nome.'
    }
  }
}

const validateDescription = (value, db, mode, item) => {
  //value is not empty
  if (typeof value !== 'undefined' && value === null) {
    return 'Este campo não pode ser nulo.'
  }
}

const validateContext = (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value é um dos valores permitidos.
  const contexts = ['GLOBAL', 'COURSE']
  if (typeof value !== 'undefined' && !Validator.isIn(value, contexts)) {
    return 'Deve ser um contexto válido.'
  }
}

const validateBody = async (body, db, mode, item) => {
  const errors = []

  const nameError = await validateName(body.name, db, mode, item)
  if (nameError) {
    errors.push({ message: nameError, path: 'name' })
  }

  const descriptionError = await validateDescription(body.description, db, mode, item)
  if (descriptionError) {
    errors.push({ message: descriptionError, path: 'description' })
  }

  const contextError = await validateContext(body.context, db, mode, item)
  if (contextError) {
    errors.push({ message: contextError, path: 'context' })
  }

  return errors.length > 0 ? errors : null
}

const validateDelete = async (role, models) => {
  const errors = []

  //validate UserRoles constraint
  const userRoles = await models.UserRole.findAll({
    where: { role_id: role.id }
  })
  if (userRoles.length > 0) {
    errors.push({ message: 'Este papel está associado a atribuições de papel ativas.', path: 'id' })
  }

  //validate RolePermissions constraint
  const rolePermissions = await models.RolePermission.findAll({
    where: { role_id: role.id }
  })
  if (rolePermissions.length > 0) {
    errors.push({ message: 'Este papel está associado a atribuições de permissão ativas.', path: 'id' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody, validateDelete }
