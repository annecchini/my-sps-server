module.exports = app => {
  const api = app.api.auth
  const route = require('../../config/routeList').auth
  const { basePath } = require('../utils/express-helpers')

  app.route(`${basePath}${route}`).post(api.authenticate)

  app.route(`${basePath}${route}/profile`).get(api.authRequired, api.readProfile)

  app.route(`${basePath}${route}/profile/user`).put(api.authRequired, api.updateProfileUser)
}
