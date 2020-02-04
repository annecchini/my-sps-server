'use strict'

const validator = require('validator')

const jwt = require('jsonwebtoken')
const jwtConf = require('../../config/jwt')

const uniqueItemList = list => [...new Set(list)]

const uniqueObjectList = (list, key) => {
  const keys = new Set()
  return list.filter(el => !keys.has(el[key]) && keys.add(el[key]))
}

const unique = (list, key) => {
  if (list.length === 0) return []
  if (typeof list[0] === 'object') {
    return uniqueObjectList(list, key)
  } else {
    return uniqueItemList(list)
  }
}

const validYears = list => {
  return unique(
    list
      ? list
          .split(',')
          .map(x => x.trim())
          .filter(x => Number(x) > 1990 && Number(x) < 2100)
      : []
  )
}

const validIdsFromString = list =>
  unique(
    list
      ? list
          .split(',')
          .map(x => x.trim())
          .filter(x => validator.isUUID(x))
      : []
  )

const validIdsFromArray = list =>
  unique(list ? list.map(x => x.toString().trim()).filter(x => validator.isUUID(x)) : [])

const validIds = list => {
  if (list) {
    if (list.constructor.name === 'Array') return validIdsFromArray(list)
    if (list.constructor.name === 'String') return validIdsFromString(list)
  }
  return []
}

const findUserByToken = async (token, db) => {
  //verificar token recebido.
  let decoded
  try {
    decoded = jwt.verify(token, jwtConf.jwt_secret)
  } catch (e) {
    return null
  }

  //Definindo a estrutura de User
  const userInclude = {
    include: [
      {
        model: db.GlobalAdmin,
        required: false
      },
      {
        model: db.UserRole,
        required: false,
        include: [
          {
            model: db.Role,
            required: false,
            include: [
              {
                model: db.RolePermission,
                required: false,
                include: [
                  {
                    model: db.Permission,
                    required: false
                  }
                ]
              }
            ]
          },
          {
            model: db.Course,
            required: false
          }
        ]
      }
    ]
  }

  //encontrar usuário e retornalo
  return await db.User.findByPk(decoded.data, userInclude)
}

const getCourseIdsByGraduationLevelIds = graduationLevelIds => {
  return []
}

const allowedCourseIds = (user, permission) => {
  return user.UserRoles.filter(ur => ur.Course)
    .map(ur => {
      const courseId = ur.Course.id
      const allowed = ur.Role.RolePermissions.map(rp => rp.Permission.name).includes(permission)
      const obj = { courseId, allowed }
      return obj
    })
    .filter(obj => obj.allowed)
    .map(obj => obj.courseId)
}

module.exports = { findUserByToken, validYears, validIds, getCourseIdsByGraduationLevelIds, allowedCourseIds }
