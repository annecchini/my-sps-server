'use strict'
const Validator = require('validator')

const validateIdentifier = (value, db, mode, item) => {
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

const validateYear = (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  } else if (typeof value !== 'undefined') {
    //value is valid
    if (value === null || value === '') {
      return 'Este campo é requerido.'
    }
    //value is a year
    if (!Validator.matches(value, /^\d{4}$/)) {
      return 'Formato inválido. Deve ser um ano no formato AAAA'
    }
  }
}

const validateCourseId = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  } else if (typeof value !== 'undefined') {
    //value is valid
    if (value === null || value === '') {
      return 'Este campo é requerido.'
    }
    //value is on database
    const Course = await db.Course.findOne({
      where: { id: value }
    })
    if (!Course) {
      return 'O curso não existe na base de dados.'
    }
  }
}

const validateVisible = (value, db, mode, item) => {
  if (typeof value !== 'undefined') {
    //value is booblean
    if ((value != true && value != false) || value === '') {
      return 'Formato inválido.'
    }
  }
}

const validateDescription = (value, db, mode, item) => {
  if (typeof value !== 'undefined') {
    //value is not null
    if (value === null) {
      return 'Este campo não pode ser nulo.'
    }
  }
}

const validateUniqueIdentifierYear = async (body, db, mode, item, identifierError, yearError) => {
  if (!identifierError && !yearError) {
    //Decidir se vai ignorar propria id
    const whereIgnoreOwnId = mode === 'update' ? { id: { [db.Sequelize.Op.not]: item.id } } : {}

    //Decidir se vai usar body.identifier ou item.identifier
    const whereIdentifier = body.identifier ? { identifier: body.identifier } : { identifier: item.identifier }

    //Decidir se vai usar body.year ou item.year
    const whereYear = body.year ? { year: body.year } : { year: item.year }

    processes = await db.Process.findAll({ where: { ...whereIdentifier, ...whereYear, ...whereIgnoreOwnId } })
    if (processes.length > 0) {
      return 'Essa combinação de identificador-ano já existe.'
    }
  }
}

const validateBody = async (body, db, mode, item) => {
  let errors = []

  const identifierError = validateIdentifier(body.identifier, db, mode, item)
  if (identifierError) {
    errors.push({ message: identifierError, path: 'identifier' })
  }

  const yearError = validateYear(body.year, db, mode, item)
  if (yearError) {
    errors.push({ message: yearError, path: 'year' })
  }

  const courseIdError = await validateCourseId(body.course_id, db, mode, item)
  if (courseIdError) {
    errors.push({ message: courseIdError, path: 'course_id' })
  }

  const visibleError = await validateVisible(body.visible, db, mode, item)
  if (visibleError) {
    errors.push({ message: visibleError, path: 'visible' })
  }

  const descriptionError = await validateDescription(body.description, db, mode, item)
  if (descriptionError) {
    errors.push({ message: descriptionError, path: 'description' })
  }

  const uniqueIdentifierYearError = await validateUniqueIdentifierYear(body, db, mode, item, identifierError, yearError)
  if (uniqueIdentifierYearError) {
    errors.push({ message: uniqueIdentifierYearError, path: 'id' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody }
