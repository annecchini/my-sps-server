module.exports = app => {
  const { basePath } = require('../lib/express-helpers')

  app.get(`${basePath}`, (req, res) => {
    res.json({ status: 'my-sps api running' })
  })
}
