'use strict'

const hasRoles = user => Boolean(user.UserRoles.length)

const isAdmin = user => Boolean(user.GlobalAdmins.length)

const findPermission = async (req, db) => {
  const permission = await db.Permission.findOne({ where: { method: req.method, path: req.route.path } })
  return permission
}

const findCourse = () => {}

const havePermission = options => {
  let userRoles = options.user.UserRoles

  //decidindo se vou aplicar contexto os userRoles
  if (options.context) {
    userRoles = userRoles.filter(ur => {
      return ur.Role.context === options.context
    })
  }

  //decidindo se vou aplicar course_id os userRoles
  if (options.course_id) {
    userRoles = userRoles.filter(ur => {
      return ur.course_id === options.course_id
    })
  }

  //procurando pela permissão solicitada.
  let havePermission = false
  if (options.permission) {
    havePermisson = userRoles
      .map(ur => {
        return ur.Role.rolePermissions
          .map(rp => {
            return rp.Permission.name === options.permission
          })
          .includes(true)
      })
      .includes(true)
  }

  return havePermission
}

module.exports = { hasRoles, isAdmin, findPermission, findCourse, havePermission }
