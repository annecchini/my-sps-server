'use strict'

const validateName = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is unique
  if (typeof value !== 'undefined') {
    const whereIgnoreOwnId = mode === 'update' ? { id: { [db.Sequelize.Op.not]: item.id } } : {}
    const graduationLevels = await db.GraduationLevel.findAll({
      where: { name: value, ...whereIgnoreOwnId }
    })
    if (graduationLevels.length > 0) {
      return 'Já existe um nível de graduação com esse nome.'
    }
  }
}

const validateBody = async (body, db, mode, item) => {
  let error
  const errors = []

  error = await validateName(body.name, db, mode, item)
  if (error) {
    errors.push({ message: error, path: 'name' })
  }

  return errors.length > 0 ? errors : null
}

const validateDelete = async (graduationLevel, models) => {
  const errors = []

  //validate course constraint
  const Courses = await models.Course.findAll({
    where: { graduationLevel_id: graduationLevel.id }
  })
  if (Courses.length > 0) {
    errors.push({ message: 'Este nivel de graduação está associado a cursos ativos.', path: 'id' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody, validateDelete }
