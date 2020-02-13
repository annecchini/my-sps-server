module.exports = app => {
  const api = app.api.process
  const route = require('../../config/routeList').process
  const authApi = app.api.auth
  const { basePath } = require('../utils/express-helpers')

  app
    .route(`${basePath}${route}`)
    .post(authApi.authRequired, api.create)
    .get(api.list)

  app.route(`${basePath}${route}/filters`).get(api.filters)

  app
    .route(`${basePath}${route}/:id`)
    .get(api.read)
    .put(authApi.authRequired, api.update)
    .delete(authApi.authRequired, api.delete)
}
