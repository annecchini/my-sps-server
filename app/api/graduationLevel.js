module.exports = app => {
  const models = app.db.models.index
  const api = {}
  const error = app.error.graduationLevel

  const generateErrorMessage = () => {
    return {
      name: 'ValidationError',
      errors: [
        {
          message: 'Não existe um elemento com o identificador enviado.',
          path: 'id'
        }
      ]
    }
  }

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
  }

  api.read = (req, res) => {
    models.GraduationLevel.findByPk(req.params.id).then(GraduationLevel => {
      if (!GraduationLevel) {
        return res.status(400).json(error.parse('graduationLevel-400', generateErrorMessage()))
      } else {
        return res.json(GraduationLevel)
      }
    })
  }

  api.update = (req, res) => {
    models.GraduationLevel.findByPk(req.params.id).then(GraduationLevel => {
      if (!GraduationLevel) {
        return res.status(400).json(error.parse('graduationLevel-400', generateErrorMessage()))
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
