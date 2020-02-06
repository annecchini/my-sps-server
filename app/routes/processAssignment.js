module.exports = app => {
  const api = app.api.processAssignment
  const route = require('../../config/routeList').processAssignment
  const authApi = app.api.auth
  const { basePath } = require('../lib/express-helpers')

  app
    .route(`${basePath}${route}`)
    .post(authApi.authRequired, api.create)
    .get(api.list)

  app
    .route(`${basePath}${route}/:id`)
    .get(api.read)
    .put(authApi.authRequired, api.update)
    .delete(authApi.authRequired, api.delete)
}
