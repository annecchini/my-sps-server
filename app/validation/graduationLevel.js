'use strict'

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
  //value is unique
  const alreadyOnDatabase = await models().GraduationLevel.count({ where: { name: value } })
  if (alreadyOnDatabase) {
    throw new Error('Já existe um nível de graduação com esse nome.')
  }
}

module.exports = { validateName }
