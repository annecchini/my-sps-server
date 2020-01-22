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
  //course exists
  if (typeof value !== 'undefined') {
    const course = await db.Course.findOne({ where: { id: value } })
    if (!course) {
      return 'O curso não existe.'
    }
  }
}

const validateUniqueUserIdRoleIdCourseId = async (value, db, mode, item, userIdError, roleIdError, courseIdError) => {
  const canUseBodyUserId = body.user_id && !userIdError ? true : false
  const canUseBodyRoleId = body.role_id && !roleIdError ? true : false
  const canUseBodyCourseId = body.courseId && !courseIdError ? true : false

  if (mode === 'create' && !userIdError && !roleIdError && !courseIdError) {
    const whereCourseId = canUseBodyCourseId ? { course_id: body.course_id } : null
    const userRoles = db.mnodels.UserRole.findAll({
      where: { user_id: body.user_id, role_id: body.role_id, ...whereCourseId }
    })
  }

  if (mode === 'update') {
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

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody }
