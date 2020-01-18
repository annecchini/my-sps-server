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

//##### Athenticate functions #####//

const validateLoginAuth = async (value, db) => {
  //value exists
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }
  //value is valid
  if (value === null || value === '') {
    return 'Este campo é requerido.'
  }
  //value exits
  const user = await db.User.findOne({ where: { login: value } })
  if (!user) {
    return 'Usuário não encontrado.'
  }
}

const validatePasswordAuth = (value, db) => {
  //value exists
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }
  //value is valid
  if (value === null || value === '') {
    return 'Este campo é requerido.'
  }
}

const validateAuthetication = async (login, password, loginError, passwordError, db) => {
  if (!loginError && !passwordError) {
    const user = await db.User.findOne({ where: { login: login } })
    const valid = await user.validPassword(password)
    if (!valid) {
      return 'Usuário ou senha incorretos.'
    }
  }
}

const validateAuth = async (body, db) => {
  let errors = []

  const loginError = await validateLoginAuth(body.login, db)
  if (loginError) {
    errors.push({ message: loginError, path: 'login' })
  }

  const passwordError = validatePasswordAuth(body.password, db)
  if (passwordError) {
    errors.push({ message: passwordError, path: 'password' })
  }

  //validate authentication
  const authError = await validateAuthetication(body.login, body.password, loginError, passwordError, db)
  if (authError) {
    errors.push({ message: authError, path: 'login' })
  }

  return errors.length > 0 ? errors : null
}

const validateAuthorizedAuth = async (login, db) => {
  const user = await db.User.findOne({ where: { login: login } })
  const authorized = user.authorized
  if (!authorized) {
    return [{ message: 'Usuário não autorizado.', path: 'authorized' }]
  }
}

module.exports = { validateBody, validateAuth, validateAuthorizedAuth }
