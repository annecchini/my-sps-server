'use strict'
const Validator = require('validator')

const validateLogin = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  } else if (typeof value !== 'undefined') {
    //value is valid
    if (value === null || value === '') {
      return 'Este campo é requerido.'
    }
    //value is a email
    if (!Validator.isEmail(value)) {
      return 'Deve ser um email.'
    }
    //value is unique
    const User = await db.User.findAll({ where: { login: value } })
    if (User.length > 0 && mode === 'update' && User.find(x => x.id !== item.id)) {
      return 'Já existe um usuário com esse login.'
    }
    if (User.length > 0 && mode !== 'update') {
      return 'Já existe um usuário com esse login.'
    }
  }
}

const validatePassword = (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  } else if (typeof value !== 'undefined') {
    //value is valid
    if (value === null || value === '') {
      return 'Este campo é requerido.'
    }
  }
}

const validateAuthorized = (value, db, mode, item) => {
  if (typeof value !== 'undefined') {
    //value is booblean
    if ((value != true && value != false) || value === '') {
      return 'Formato inválido.'
    }
  }
}

const validateBody = async (body, db, mode, item) => {
  let errors = []

  const loginError = await validateLogin(body.login, db, mode, item)
  if (loginError) {
    errors.push({ message: loginError, path: 'login' })
  }
  const passwordError = validatePassword(body.password, db, mode, item)
  if (passwordError) {
    errors.push({ message: passwordError, path: 'password' })
  }
  const authorizedError = validateAuthorized(body.authorized, db, mode, item)
  if (authorizedError) {
    errors.push({ message: authorizedError, path: 'authorized' })
  }

  return errors.length > 0 ? errors : null
}

const validateDelete = async (user, models) => {
  const errors = []

  //validate UserRoles constraint
  const userRoles = await models.UserRole.findAll({
    where: { user_id: user.id }
  })
  if (userRoles.length > 0) {
    errors.push({ message: 'Este usuário está associado a atribuições de papel ativas.', path: 'id' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody, validateDelete }
