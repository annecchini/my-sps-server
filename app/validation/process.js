'use strict'
const Validator = require('validator')

const validateIdentifier = (value, models, mode, item) => {
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

const validateYear = (value, models, mode, item) => {
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

const validateCourseId = async (value, models, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  } else if (typeof value !== 'undefined') {
    //value is valid
    if (value === null || value === '') {
      return 'Este campo é requerido.'
    }
    //value is on database
    const Course = await models.Course.findOne({
      where: { id: value }
    })
    if (!Course) {
      return 'O Curso não existe na base de dados.'
    }
  }
}

const validateVisible = (value, models, mode, item) => {
  if (typeof value !== 'undefined') {
    //value is booblean
    if (value != true && value != false) {
      return 'Formato inválido.'
    }
  }
}

const validateDescription = (value, models, mode, item) => {
  if (typeof value !== 'undefined') {
    //value is not null
    if (value === null) {
      return 'Este campo não pode ser nulo.'
    }
  }
}

const validateUniqueIdentifierYear = async (body, models, mode, item, identifierError, yearError) => {
  if (mode === 'create') {
    if (!identifierError && !yearError) {
      const Processes = await models.Process.findAll({
        where: { identifier: body.identifier, year: body.year }
      })
      if (Processes.length > 0) {
        const uniqueErrorIdentifier = { message: 'A combinação identificador/ano deve ser única.', path: 'identifier' }
        const uniqueErrorYear = { message: 'A combinação identificador/ano deve ser única.', path: 'year' }
        return [uniqueErrorIdentifier, uniqueErrorYear]
      }
    }
  }
  if (mode === 'update') {
    const canUseBodyIdentifier = body.identifier && !identifierError ? true : false
    const canUseBodyYear = body.year && !yearError ? true : false

    let Processes = []
    let where = null

    if (canUseBodyIdentifier && canUseBodyYear) {
      where = { identifier: body.identifier, year: body.year }
    } else if (canUseBodyIdentifier && !yearError) {
      where = { identifier: body.identifier, year: item.year }
    } else if (canUseBodyYear && !identifierError) {
      where = { identifier: item.identifier, year: body.year }
    }
    if (where) {
      Processes = await models.Process.findAll({ where: where })
    }
    if (Processes.length > 0 && Processes.find(x => x.id !== item.id)) {
      const uniqueErrorIdentifier = { message: 'A combinação identificador/ano deve ser única.', path: 'identifier' }
      const uniqueErrorYear = { message: 'A combinação identificador/ano deve ser única.', path: 'year' }
      return [uniqueErrorIdentifier, uniqueErrorYear]
    }
  }
}

const validateBody = async (body, models, mode, item) => {
  let errors = []

  const identifierError = validateIdentifier(body.identifier, models, mode, item)
  if (identifierError) {
    errors.push({ message: identifierError, path: 'identifier' })
  }

  const yearError = validateYear(body.year, models, mode, item)
  if (yearError) {
    errors.push({ message: yearError, path: 'year' })
  }

  const courseIdError = await validateCourseId(body.course_id, models, mode, item)
  if (courseIdError) {
    errors.push({ message: courseIdError, path: 'course_id' })
  }

  const visibleError = await validateVisible(body.visible, models, mode, item)
  if (visibleError) {
    errors.push({ message: visibleError, path: 'visible' })
  }

  const descriptionError = await validateDescription(body.description, models, mode, item)
  if (descriptionError) {
    errors.push({ message: descriptionError, path: 'description' })
  }

  const uniqueIdentifierYearErrors = await validateUniqueIdentifierYear(body, models, mode, item, identifierError, yearError)
  if (uniqueIdentifierYearErrors) {
    errors = errors.concat(uniqueIdentifierYearErrors)
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody }
