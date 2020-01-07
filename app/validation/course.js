'use strict'

const validateName = sequelize => async value => {
  //value exists
  if (typeof value === 'undefined') {
    throw new Error('Este campo é necessário.')
  }
  //value is valid
  if (value === null || value === '') {
    throw new Error('Este campo é requerido.')
  }
  //value is unique
  const Course = sequelize.import('../db/models/course')
  const alreadyOnDatabase = await Course.count({
    where: { name: value }
  })
  if (alreadyOnDatabase) {
    throw new Error('Já existe um curso com esse nome.')
  }
}

module.exports = { validateName }
