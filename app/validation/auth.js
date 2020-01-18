'use strict'

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

const validateBody = async (body, db) => {
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

module.exports = { validateBody, validateAuthorizedAuth }
