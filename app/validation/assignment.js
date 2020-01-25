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
    const assignments = await db.Assignment.findAll({
      where: { name: value, ...whereIgnoreOwnId }
    })
    if (assignments.length > 0) {
      return 'Já existe um cargo com esse nome.'
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

const validateDelete = async (assignment, models) => {
  const errors = []

  //validate processAssignments constraint
  const processAssignments = await models.ProcessAssignment.findAll({
    where: { assignment_id: assignment.id }
  })
  if (processAssignments.length > 0) {
    errors.push({ message: 'Este cargo está associado a atribuições de cargo ativas.', path: 'id' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody, validateDelete }
