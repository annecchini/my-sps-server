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
  const GraduationLevel = sequelize.import('../db/models/graduationlevel')
  const alreadyOnDatabase = await GraduationLevel.count({ where: { name: value } })
  if (alreadyOnDatabase) {
    throw new Error('Já existe um nível de graduação com esse nome.')
  }
}

module.exports = { validateName }
