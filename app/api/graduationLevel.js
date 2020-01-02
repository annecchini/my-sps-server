module.exports = app => {
  const models = app.db.models.index
  const api = {}
  const error = app.error.graduationLevel

  api.list = (req, res) => {
    models.GraduationLevel.findAll({}).then(
      GraduationLevels => {
        return res.json(GraduationLevels)
      },
      e => {
        return res.status(500).json(error.parse('graduationLevel-02', e))
      }
    )
  }

  api.create = (req, res) => {
    if (!(Object.prototype.toString.call(req.body) === '[object Object]') || !req.body.name) {
      res.status(400).json(error.parse('graduationLevel-01', {}))
    } else {
      models.GraduationLevel.create(req.body).then(
        GraduationLevel => {
          return res.status(201).json(GraduationLevel)
        },
        e => {
          return res.status(500).json(error.parse('GraduationLevel-02', e))
        }
      )
    }
  }

  api.read = (req, res) => {
    models.GraduationLevel.findByPk(req.params.id).then(GraduationLevel => {
      if (!GraduationLevel) {
        return res.status(400).json(error.parse('graduationLevel-03', e))
      } else {
        return res.json(GraduationLevel)
      }
    })
  }

  api.update = (req, res) => {
    models.GraduationLevel.findByPk(req.params.id).then(GraduationLevel => {
      if (!GraduationLevel) {
        res.status(400).json(error.parse('graduationLevel-03', {}))
      } else {
        GraduationLevel.update(req.body, { fields: Object.keys(req.body) }).then(
          updated => res.json(updated),
          e => res.status(500).json(error.parse('GraduationLevels-02', e))
        )
      }
    })
  }

  api.delete = (req, res) => {
    models.GraduationLevel.destroy({ where: { id: req.params.id } }).then(
      _ => res.sendStatus(204),
      e => res.status(500).json(error.parse('graduationLevel-02', e))
    )
  }

  return api
}
