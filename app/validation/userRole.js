'use strict'

const validateUserId = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //user exists
  if (typeof value !== 'undefined') {
    const user = await db.User.findOne({ where: { id: value } })
    if (!user) {
      return 'O usuário não existe.'
    }
  }
}

const validateRoleId = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //role exists
  if (typeof value !== 'undefined') {
    const role = await db.Role.findOne({ where: { id: value } })
    if (!role) {
      return 'O papel não existe.'
    }
  }
}

const validateCourseId = async (value, db, mode, item) => {
  //course exists, course can be null.
  if (typeof value !== 'undefined' && value !== null) {
    const course = await db.Course.findOne({ where: { id: value } })
    if (!course) {
      return 'O curso não existe.'
    }
  }
}

const validateUniqueUserIdRoleIdCourseId = async (body, db, mode, item, userIdError, roleIdError, courseIdError) => {
  //executar apenas se não existe erro em nemhum campo envolvido.
  if (!userIdError && !roleIdError && !courseIdError) {
    //Decidir se vai ignorar propria id
    const whereIgnoreOwnId = mode === 'update' ? { id: { [db.Sequelize.Op.not]: item.id } } : {}

    //Decidir se vai usar body.user_id ou item.user_id
    const whereUserId = body.user_id ? { user_id: body.user_id } : { user_id: item.user_id }

    //Decidir se vai usar body.role_id ou item.role_id
    const whereRoleId = body.role_id ? { role_id: body.role_id } : { role_id: item.role_id }

    //Decidir se vai usar body.course_id ou item.course_id
    const whereCourseId =
      body.course_id || body.course_id === null ? { course_id: body.course_id } : { course_id: item.course_id }

    const userRoles = await db.UserRole.findAll({
      where: { ...whereUserId, ...whereRoleId, ...whereCourseId, ...whereIgnoreOwnId }
    })
    if (userRoles.length > 0) {
      return 'Essa combinação de usuário-papel-curso já existe.'
    }
  }
}

const validateBody = async (body, db, mode, item) => {
  let errors = []

  const userIdError = await validateUserId(body.user_id, db, mode, item)
  if (userIdError) {
    errors.push({ message: userIdError, path: 'user_id' })
  }
  const roleIdError = await validateRoleId(body.role_id, db, mode, item)
  if (roleIdError) {
    errors.push({ message: roleIdError, path: 'role_id' })
  }
  const courseIdError = await validateCourseId(body.course_id, db, mode, item)
  if (courseIdError) {
    errors.push({ message: courseIdError, path: 'course_id' })
  }

  const uniqueError = await validateUniqueUserIdRoleIdCourseId(
    body,
    db,
    mode,
    item,
    userIdError,
    roleIdError,
    courseIdError
  )
  if (uniqueError) {
    errors.push({ message: uniqueError, path: 'id' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody }
