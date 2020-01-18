'use strict'

const validateUserId = async (value, db, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is not empty
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is on user database
  if (typeof value !== 'undefined') {
    const User = await db.User.findOne({
      where: { id: value }
    })
    if (!User) {
      return 'O usuário não existe na base de dados.'
    }
  }

  //value is "unique" on globalAdmin table.
  if (typeof value !== 'undefined') {
    const globalAdmins = await db.GlobalAdmin.findAll({
      where: { user_id: value }
    })
    if (globalAdmins.length > 0 && mode === 'update' && globalAdmins.find(x => x.id !== item.id)) {
      return 'O usuário já possui privilégios de administrador.'
    }
    if (globalAdmins.length > 0 && mode !== 'update') {
      return 'O usuário já possui privilégios de administrador.'
    }
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

const validateBody = async (body, db, mode, item) => {
  let errors = []

  const userIdError = await validateUserId(body.user_id, db, mode, item)
  if (userIdError) {
    errors.push({ message: userIdError, path: 'user_id' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody }
