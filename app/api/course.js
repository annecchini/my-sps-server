module.exports = app => {
  const models = app.db.models.index
  const api = {}
  const error = app.error.course

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
    models.Course.findAll({ order: [['name', 'ASC']] }).then(
      Courses => {
        return res.json(Courses)
      },
      e => {
        return res.status(500).json(error.parse('course-500', e))
      }
    )
  }

  api.create = (req, res) => {
    models.Course.create(req.body).then(
      Course => {
        return res.status(201).json(Course)
      },
      e => {
        if (e.name === 'SequelizeValidationError') {
          return res.status(400).json(error.parse('course-400', e))
        } else {
          return res.status(500).json(error.parse('course-500', e))
        }
      }
    )
  }

  api.read = (req, res) => {
    models.Course.findByPk(req.params.id).then(Course => {
      if (!Course) {
        return res
          .status(400)
          .json(error.parse('course-400', generateErrorMessage()))
      } else {
        return res.json(Course)
      }
    })
  }

  api.update = (req, res) => {
    models.Course.findByPk(req.params.id).then(Course => {
      if (!Course) {
        return res
          .status(400)
          .json(error.parse('course-400', generateErrorMessage()))
      } else {
        Course.update(req.body, { fields: Object.keys(req.body) }).then(
          updated => res.json(updated),
          e => {
            if (e.name === 'SequelizeValidationError') {
              return res.status(400).json(error.parse('course-400', e))
            } else {
              return res.status(500).json(error.parse('course-500', e))
            }
          }
        )
      }
    })
  }

  api.delete = (req, res) => {
    models.Course.destroy({ where: { id: req.params.id } }).then(
      _ => res.sendStatus(204),
      e => res.status(500).json(error.parse('course-500', e))
    )
  }

  return api
}
