'use strict'

const validateName = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  } else if (typeof value !== 'undefined') {
    //value is valid
    if (value === null || value === '') {
      return 'Este campo é requerido.'
    }
    //value is unique
    const Courses = await db.Course.findAll({
      where: { name: value }
    })
    if (Courses.length > 0 && mode === 'update' && Courses.find(x => x.id !== item.id)) {
      return 'Já existe um curso com esse nome.'
    }
    if (Courses.length > 0 && mode !== 'update') {
      return 'Já existe um curso com esse nome.'
    }
  }
}

const validateGraduationLevelId = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  } else if (typeof value !== 'undefined') {
    //value is valid
    if (value === null || value === '') {
      return 'Este campo é requerido.'
    }
    //value is on database
    const GradLevel = await db.GraduationLevel.findOne({
      where: { id: value }
    })
    if (!GradLevel) {
      return 'O nível de graduação não existe na base de dados.'
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

  error = await validateGraduationLevelId(body.graduationLevel_id, db, mode, item)
  if (error) {
    errors.push({ message: error, path: 'graduationLevel_id' })
  }

  return errors.length > 0 ? errors : null
}

const validateDelete = async (course, models) => {
  const errors = []

  //validate process constraint
  const Processes = await models.Process.findAll({
    where: { course_id: course.id }
  })
  if (Processes.length > 0) {
    errors.push({ message: 'Este curso está associado a processos ativos.', path: 'id' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody, validateDelete }
