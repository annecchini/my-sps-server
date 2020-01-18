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
      return 'Já existe um nível de graduação com esse nome.'
    }
    if (role.length > 0 && mode !== 'update') {
      return 'Já existe um nível de graduação com esse nome.'
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

  //update (valor = false) mas o role possui permissões globais (se eu criar permissões com tipo)
}

const validateBody = async (body, db, mode, item) => {
  const errors = []

  const nameError = await validateName(body.name, db, mode, item)
  if (nameError) {
    errors.push({ message: nameError, path: 'name' })
  }

  const descriptionError = await validateDescription(body.description, db, mode, item)
  if (descriptionError) {
    errors.push({ message: descriptionError, path: 'name' })
  }

  const globalError = await validateGlobal(body.global, db, mode, item)
  if (globalError) {
    errors.push({ message: globalError, path: 'name' })
  }

  return errors.length > 0 ? errors : null
}

const validateDelete = async (role, models) => {
  const errors = []

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody, validateDelete }
