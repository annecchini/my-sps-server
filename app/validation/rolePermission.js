'use strict'

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

const validatePermissionId = async (value, db, mode, item) => {
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
    const permission = await db.Permission.findOne({ where: { id: value } })
    if (!permission) {
      return 'O usuário não existe.'
    }
  }
}

const validateUniqueRoleIdPermissionId = async (body, db, mode, item, roleIdError, permissionIdError) => {
  //executar apenas se não existe erro em nemhum campo envolvido.
  if (!roleIdError && !permissionIdError) {
    //Decidir se vai ignorar propria id
    const whereIgnoreOwnId = mode === 'update' ? { id: { [db.Sequelize.Op.not]: item.id } } : {}

    //Decidir se vai usar body.role_id ou item.role_id
    const whereRoleId = body.role_id ? { role_id: body.role_id } : { role_id: item.role_id }

    //Decidir se vai usar body.permission_id ou item.permission_id
    const wherePermissionId = body.permission_id
      ? { permission_id: body.permission_id }
      : { permission_id: item.permission_id }

    const rolePermissions = await db.RolePermission.findAll({
      where: { ...whereRoleId, ...wherePermissionId, ...whereIgnoreOwnId }
    })
    if (rolePermissions.length > 0) {
      return 'Essa combinação de papel-permissão já existe.'
    }
  }
}

const validateBody = async (body, db, mode, item) => {
  let errors = []

  const roleIdError = await validateRoleId(body.role_id, db, mode, item)
  if (roleIdError) {
    errors.push({ message: roleIdError, path: 'role_id' })
  }

  const permissionIdError = await validatePermissionId(body.user_id, db, mode, item)
  if (permissionIdError) {
    errors.push({ message: permissionIdError, path: 'user_id' })
  }

  const uniqueError = await validateUniqueRoleIdPermissionId(body, db, mode, item, roleIdError, permissionIdError)
  if (uniqueError) {
    errors.push({ message: uniqueError, path: 'id' })
  }

  return errors.length > 0 ? errors : null
}

module.exports = { validateBody }
