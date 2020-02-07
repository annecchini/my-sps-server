'use strict'

const isAdmin = user => Boolean(user.GlobalAdmins.length)

const findPermission = async (req, db) => {
  const permission = await db.Permission.findOne({ where: { method: req.method, path: req.route.path } })
  return permission
}

const havePermission = options => {
  let userRoles = options.user.UserRoles
  let havePermission = false

  //decidindo se vou aplicar contexto os userRoles
  if (options.context) {
    userRoles = userRoles.filter(ur => {
      return ur.Role.context === options.context
    })
  }

  //decidindo se vou aplicar course_id os userRoles
  if (options.course_id) {
    userRoles = userRoles.filter(ur => {
      return ur.Course.id === options.course_id
    })
  }

  //procurando pela permissão solicitada.
  if (options.permission) {
    havePermission = userRoles
      .map(ur => {
        return ur.Role.RolePermissions.map(rp => {
          return rp.Permission.name === options.permission
        }).includes(true)
      })
      .includes(true)
  }

  return havePermission
}

module.exports = { isAdmin, findPermission, havePermission }
