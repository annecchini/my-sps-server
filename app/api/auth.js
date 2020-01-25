'use strict'

const jwt = require('jsonwebtoken')

const jwtConf = require('../../config/jwt')
const { generateValidationErrorMessage, generateUnauthorizedErrorMessage } = require('../lib/error-helpers')
const { validateBody, validateAuthorizedAuth } = require('../validation/auth')
const { isAdmin } = require('../lib/permission-system-helpers')

module.exports = app => {
  const db = app.db.models.index
  const api = {}
  const error = app.error.auth

  const userInclude = {
    include: [
      {
        model: db.GlobalAdmin,
        required: false
      },
      {
        model: db.UserRole,
        required: false,
        attributes: {
          exclude: ['role_id', 'user_id', 'course_id']
        },
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

  api.authenticate = async (req, res) => {
    //validation
    const validationErrors = await validateBody(req.body, db)
    if (validationErrors) {
      return res.status(400).json(error.parse('auth-400', generateValidationErrorMessage(validationErrors)))
    }

    //authorization
    const authorizedErrors = await validateAuthorizedAuth(req.body.login, db)
    if (authorizedErrors) {
      return res.status(401).json(error.parse('auth-401', generateUnauthorizedErrorMessage(authorizedErrors)))
    }

    //send the token to the user
    const user = await db.User.findOne({ where: { login: req.body.login } })
    let access_token = jwt.sign({ data: user.id }, jwtConf.jwt_secret, jwtConf.options)
    return res.json({ access_token, userMessage: 'Authentication success' })
  }

  api.authRequired = async (req, res, next) => {
    //verificar token recebido.
    let decoded
    try {
      decoded = jwt.verify(req.headers['x-access-token'], jwtConf.jwt_secret)
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        const errors = [{ message: 'Token expirado.', path: 'x-access-token', original: e }]
        return res.status(401).json(error.parse('auth-401', generateUnauthorizedErrorMessage(errors)))
      }

      if (e.name === 'JsonWebTokenError') {
        const errors = [{ message: 'Token inválido.', path: 'x-access-token', original: e }]
        return res.status(401).json(error.parse('auth-401', generateUnauthorizedErrorMessage(errors)))
      }

      return res.status(500).json(error.parse('auth-500', e))
    }

    //encontrar usuário associado e adiciona-lo a request.
    const user = await db.User.findByPk(decoded.data, userInclude)
    if (!user) {
      const errors = [{ messsage: 'Usuário não encontrado.', path: 'x-access-token' }]
      return res.status(401).json(error.parse('auth-401', generateUnauthorizedErrorMessage(errors)))
    } else {
      req.user = user
    }

    //seguir para o proximo middleware.
    return next()
  }

  api.adminRequired = async (req, res, next) => {
    //Logida do middleware
    const internalAdminRequired = () => {
      if (isAdmin(req.user)) return next()
      else {
        const errors = [{ messsage: 'Nível de acesso administrador requerido.', path: 'x-access-token' }]
        return res.status(401).json(error.parse('auth-401', generateUnauthorizedErrorMessage(errors)))
      }
    }

    await api.authRequired(req, res, internalAdminRequired)
  }

  api.accessLevelRequired = () => {}

  return api
}
