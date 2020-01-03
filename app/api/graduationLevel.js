module.exports = app => {
  const models = app.db.models.index
  const api = {}
  const error = app.error.graduationLevel

  api.list = (req, res) => {
    models.GraduationLevel.findAll({ order: [['name', 'ASC']] }).then(
      GraduationLevels => {
        return res.json(GraduationLevels)
      },
      e => {
        return res.status(500).json(error.parse('graduationLevel-500', e))
      }
    )
  }

  api.create = (req, res) => {
    //validation
    // const validation = validateCreate(req.body)
    // if (!validation.ok) {
    //   return res.status(400).json(error.parse('graduationLevel-400', validation.errors))
    // }

    // if (!(Object.prototype.toString.call(req.body) === '[object Object]') || !req.body.name) {
    //   return res.status(400).json(error.parse('graduationLevel-400', { errorMessage: 'inválido ou sem nome.' }))
    // } else {
    models.GraduationLevel.create(req.body).then(
      GraduationLevel => {
        return res.status(201).json(GraduationLevel)
      },
      e => {
        if (e.name === 'SequelizeValidationError') {
          return res.status(400).json(error.parse('graduationLevel-400', e))
        } else {
          return res.status(500).json(error.parse('graduationLevel-500', e))
        }
      }
    )
    // }
  }

  api.read = (req, res) => {
    models.GraduationLevel.findByPk(req.params.id).then(GraduationLevel => {
      if (!GraduationLevel) {
        return res.status(400).json(error.parse('graduationLevel-400', e))
      } else {
        return res.json(GraduationLevel)
      }
    })
  }

  api.update = (req, res) => {
    models.GraduationLevel.findByPk(req.params.id).then(GraduationLevel => {
      if (!GraduationLevel) {
        res.status(400).json(
          error.parse('graduationLevel-400', {
            name: 'ValidationError',
            errors: [
              {
                message: 'Não existe um elemento com o identificador enviado.',
                path: 'id'
              }
            ]
          })
        )
      } else {
        GraduationLevel.update(req.body, { fields: Object.keys(req.body) }).then(
          updated => res.json(updated),
          e => res.status(500).json(error.parse('graduationLevel-500', e))
        )
      }
    })
  }

  api.delete = (req, res) => {
    models.GraduationLevel.destroy({ where: { id: req.params.id } }).then(
      _ => res.sendStatus(204),
      e => res.status(500).json(error.parse('graduationLevel-500', e))
    )
  }

  return api
}
