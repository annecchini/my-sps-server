module.exports = app => {
  const api = app.api.auth
  const route = require('../../config/routeList').auth
  const { basePath } = require('../utils/express-helpers')

  app.route(`${basePath}${route}`).post(api.authenticate)
}
