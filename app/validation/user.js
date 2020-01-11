'use strict'
const Validator = require('validator')

const validateLogin = async (value, models, mode, item) => {
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
    const User = await models.User.findAll({
      where: { login: value }
    })
    if (User.length > 0 && mode === 'update' && User.find(x => x.id !== item.id)) {
      return 'Já existe um usuário com esse login.'
    }
    if (User.length > 0 && mode !== 'update') {
      return 'Já existe um usuário com esse login.'
    }
  }
}

const validatePassword = (value, models, mode, item) => {
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

const validateAuthorized = (value, models, mode, item) => {
  if (typeof value !== 'undefined') {
    //value is booblean
    if ((value != true && value != false) || value === '') {
      return 'Formato inválido.'
    }
  }
}

const validateBody = async (body, models, mode, item) => {
  let errors = []

  const loginError = await validateLogin(body.login, models, mode, item)
  if (loginError) {
    errors.push({ message: loginError, path: 'login' })
  }
  const passwordError = validatePassword(body.password, models, mode, item)
  if (passwordError) {
    errors.push({ message: passwordError, path: 'password' })
  }
  const authorizedError = validateAuthorized(body.authorized, models, mode, item)
  if (authorizedError) {
    errors.push({ message: authorizedError, path: 'authorized' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody }
