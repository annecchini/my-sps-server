'use strict'
const Validator = require('validator')

const validateLogin = (value, models, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  } else if (typeof value !== 'undefined') {
    //value is valid
    if (value === null || value === '') {
      return 'Este campo é requerido.'
    }
    //value is a email
    if (Validator.isEmail(value)) {
      return 'Deve ser um email.'
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
    if (value != true && value != false) {
      return 'Formato inválido.'
    }
  }
}

const validateBody = async (body, models, mode, item) => {
  let errors = []

  const loginError = validateLogin(body.identifier, models, mode, item)
  if (loginError) {
    errors.push({ message: loginError, path: 'login' })
  }
  const passwordError = validatePassword(body.identifier, models, mode, item)
  if (passwordError) {
    errors.push({ message: passwordError, path: 'password' })
  }
  const authorizedError = validateAuthorized(body.identifier, models, mode, item)
  if (authorizedError) {
    errors.push({ message: authorizedError, path: 'authorized' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody }
