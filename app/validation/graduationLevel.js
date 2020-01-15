'use strict'

const validateName = async (value, models, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  } else if (typeof value !== 'undefined') {
    //value is valid
    if (value === null || value === '') {
      return 'Este campo é requerido.'
    }
    //value is unique
    const GradLevels = await models.GraduationLevel.findAll({
      where: { name: value }
    })
    if (GradLevels.length > 0 && mode === 'update' && GradLevels.find(x => x.id !== item.id)) {
      return 'Já existe um nível de graduação com esse nome.'
    }
    if (GradLevels.length > 0 && mode !== 'update') {
      return 'Já existe um nível de graduação com esse nome.'
    }
  }
}

const validateBody = async (body, models, mode, item) => {
  let error
  const errors = []

  error = await validateName(body.name, models, mode, item)
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
