'use strict'

const { idNotFoundErrorMessage, generateValidationErrorMessage } = require('../lib/error-helpers')
const { validateBody } = require('../validation/user')

module.exports = app => {
  const models = app.db.models.index
  const api = {}
  const error = app.error.user

  api.list = (req, res) => {
    models.User.findAll({ order: [['login', 'ASC']] }).then(
      toList => {
        return res.json(toList)
      },
      e => {
        return res.status(500).json(error.parse('user-500', e))
      }
    )
  }

  api.create = async (req, res) => {
    //validation
    const errors = await validateBody(req.body, models, 'create')
    if (errors) {
      return res.status(400).json(error.parse('user-400', generateValidationErrorMessage(errors)))
    }

    //try to create
    try {
      const created = await models.User.create(req.body)
      return res.status(201).json(created)
    } catch (e) {
      console.log(e)
      return res.status(500).json(error.parse('user-500', e))
    }
  }

  api.read = async (req, res) => {
    const toRead = await models.User.findByPk(req.params.id)

    //verify valid id
    if (!toRead) {
      return res.status(400).json(error.parse('user-400', idNotFoundErrorMessage()))
    }

    //return result
    return res.json(toRead)
  }

  api.update = async (req, res) => {
    const toUpdate = await models.User.findByPk(req.params.id)

    //verify valid id
    if (!toUpdate) {
      return res.status(400).json(error.parse('user-400', idNotFoundErrorMessage()))
    }

    //validation
    const errors = await validateBody(req.body, models, 'update', toUpdate)
    if (errors) {
      return res.status(400).json(error.parse('user-400', generateValidationErrorMessage(errors)))
    }

    //try to update
    try {
      const updated = await toUpdate.update(req.body, {
        fields: Object.keys(req.body)
      })
      return res.json(updated)
    } catch (e) {
      return res.status(500).json(error.parse('user-500', e))
    }
  }

  api.delete = async (req, res) => {
    const toDelete = await models.User.findByPk(req.params.id)

    //verify valid id
    if (!toDelete) {
      return res.status(400).json(error.parse('user-400', idNotFoundErrorMessage()))
    }

    //try to delete
    try {
      models.User.destroy({ where: { id: req.params.id } }).then(_ => res.sendStatus(204))
    } catch (e) {
      return res.status(500).json(error.parse('user-500', e))
    }
  }

  api.authenticate = (req, res) => {
    //validation
    const validationErrors = validateAuth(req.body, models)
    if (validationErrors) {
      return res.status(400).json(error.parse('user-400', generateValidationErrorMessage(errors)))
    }

    //authorization
    const authorizedErrors = validateAuthorizedAuth(req.body, models)
    if (authorizedErrors) {
      return res.status(401).json(error.parse('user-401', generateValidationErrorMessage(errors)))
    }

    //send the token to the user
    let access_token = jwt.sign({ data: user.id }, app.get('jwt_secret'), { expiresIn: '6h' })
    return res.json({ access_token, userMessage: 'Authentication success' })

    // if (req.body && req.body.login && req.body.password) {
    //   models.User.findOne({ where: { login: req.body.login } }).then(
    //     user => {
    //       if (!user) {
    //         res.status(401).json(error.parse('auth-04', 'This login was not found.'))
    //       } else if (!user.authorized) {
    //         res.status(401).json(error.parse('auth-09', new Error('User is unauthorized')))
    //       } else {
    //         user.validPassword(req.body.password).then(valid => {
    //           if (valid) {
    //             let access_token = jwt.sign({ data: user.id }, app.get('jwt_secret'), { expiresIn: '6h' })
    //             res.json({ access_token, userMessage: 'Authentication success' })
    //           } else {
    //             res.status(401).json(error.parse('auth-05', 'Wrong user or password.'))
    //           }
    //         })
    //       }
    //     },
    //     e => res.status(500).json(error.parse('auth-06', 'Internal server error.'))
    //   )
    // } else {
    //   res.status(400).json(error.parse('auth-03', 'The request must provide a login and password.'))
    // }
  }

  return api
}
