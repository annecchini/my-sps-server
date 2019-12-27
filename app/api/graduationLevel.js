module.exports = app => {
  const models = app.db.models.index
  const api = {}
  const error = app.error.graduationLevel

  // api.create = (req, res) => {
  //   if (!(Object.prototype.toString.call(req.body) === '[object Object]') || !req.body.name) {
  //     res.status(400).json(error.parse('graduationLevel-01', {}))
  //   } else {
  //     models.GraduationLevel.create(req.body).then(
  //       _ => {
  //         res.sendStatus(201)
  //       },
  //       e => {
  //         res.status(500).json(error.parse('GraduationLevel-02', e))
  //       }
  //     )
  //   }
  // }

  api.list = (req, res) => {
    models.GraduationLevel.findAll({}).then(
      GraduationLevels => {
        res.json(GraduationLevels)
      },
      e => {
        res.status(500).json(error.parse('graduationLevel-02', e))
      }
    )
  }

  api.specific = (req, res) => {
    models.GraduationLevel.findByPk(req.params.id).then(GraduationLevel => {
      if (!GraduationLevel) {
        res.status(400).json(error.parse('graduationLevel-03', e))
      } else {
        res.json(GraduationLevel)
      }
    })
  }

  // api.update = (req, res) => {
  //   models.GraduationLevel.findById(req.params.id).then(GraduationLevel => {
  //     if (!GraduationLevel) {
  //       res.status(400).json(error.parse('graduationLevel-03', {}))
  //     } else {
  //       GraduationLevel.update(req.body, { fields: Object.keys(req.body) }).then(
  //         updated => res.json(updated),
  //         e => res.status(500).json(error.parse('GraduationLevels-02', e))
  //       )
  //     }
  //   })
  // }

  // api.delete = (req, res) => {
  //   models.GraduationLevel.destroy({ where: { id: req.params.id } }).then(
  //     _ => res.sendStatus(204),
  //     e => res.status(500).json(error.parse('graduationLevel-02', e))
  //   )
  // }

  return api
}
