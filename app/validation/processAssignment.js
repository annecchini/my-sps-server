'use strict'

const validateProcessId = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //process exists
  if (typeof value !== 'undefined') {
    const process = await db.Process.findOne({ where: { id: value } })
    if (!process) {
      return 'O processo não existe.'
    }
  }
}

const validateAssignmentId = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //assignment exists
  if (typeof value !== 'undefined') {
    const assignment = await db.Assignment.findOne({ where: { id: value } })
    if (!assignment) {
      return 'O cargo não existe.'
    }
  }
}

const validateUniqueProcessIdAssignmentId = async (body, db, mode, item, processIdError, assignmentIdError) => {
  //executar apenas se não existe erro em nemhum campo envolvido.
  if (!processIdError && !assignmentIdError) {
    //Decidir se vai ignorar propria id
    const whereIgnoreOwnId = mode === 'update' ? { id: { [db.Sequelize.Op.not]: item.id } } : {}

    //Decidir se vai usar body.process_id ou item.process_id
    const whereProcessId = body.process_id ? { process_id: body.process_id } : { process_id: item.process_id }

    //Decidir se vai usar body.assignment_id ou item.assignment_id
    const whereAssignmentId = body.assignment_id
      ? { assignment_id: body.assignment_id }
      : { assignment_id: item.assignment_id }

    const processAssignments = await db.ProcessAssignment.findAll({
      where: { ...whereProcessId, ...whereAssignmentId, ...whereIgnoreOwnId }
    })
    if (processAssignments.length > 0) {
      return 'Essa combinação de processo-cargo já existe.'
    }
  }
}

const validateBody = async (body, db, mode, item) => {
  let errors = []

  const processIdError = await validateProcessId(body.process_id, db, mode, item)
  if (processIdError) {
    errors.push({ message: processIdError, path: 'process_id' })
  }

  const assignmentIdError = await validateAssignmentId(body.assignment_id, db, mode, item)
  if (assignmentIdError) {
    errors.push({ message: assignmentIdError, path: 'assignment_id' })
  }

  const uniqueError = await validateUniqueProcessIdAssignmentId(body, db, mode, item, processIdError, assignmentIdError)
  if (uniqueError) {
    errors.push({ message: uniqueError, path: 'id' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody }
