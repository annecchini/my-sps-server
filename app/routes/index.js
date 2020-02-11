module.exports = app => {
  const { basePath } = require('../utils/express-helpers')

  app.get(`${basePath}/`, (req, res) => {
    res.json({ status: 'my-sps api running' })
  })
}
