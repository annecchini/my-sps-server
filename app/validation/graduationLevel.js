'use strict'
const Validator = require('validator')

const { isEmpty } = require('./is-empty')
const models = require('../db/models/index')

const validateName = async value => {
  //value exists
  if (typeof value === 'undefined') {
    throw new Error('Este campo é necessário.')
  }
  //value is valid
  if (value === null || value === '') {
    throw new Error('Este campo é requerido.')
  }
  //is unique
  const alreadyOnDatabase = await models().GraduationLevel.count({ where: { name: value } })
  if (alreadyOnDatabase) {
    throw new Error('Já existe um nível de graduação com esse nome.')
  }
}

const validateCreate = (body, options) => {
  let errors = {}

  if (!(Object.prototype.toString.call(body) === '[object Object]')) {
    errors.message = 'Dados não enviados.'
    return {
      errors: errors,
      isValid: isEmpty(errors)
    }
  }

  const name = !isEmpty(body.name) ? body.name : ''

  //validação de formato.
  if (Validator.isEmpty(name)) {
    errors.name = 'Este campo é requerido.'
  }

  //validação de negocio.

  return {
    ok: isEmpty(errors),
    errors: errors
  }
}

module.exports = { validateCreate, validateName }
