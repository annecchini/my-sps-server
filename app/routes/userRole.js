module.exports = app => {
  const api = app.api.userRole
  const route = require('../../config/routeList').userRole
  const authApi = app.api.auth
  const { basePath } = require('../utils/express-helpers')

  app
    .route(`${basePath}${route}`)
    .post(authApi.adminRequired, api.create)
    .get(authApi.adminRequired, api.list)

  app
    .route(`${basePath}${route}/:id`)
    .get(authApi.adminRequired, api.read)
    .put(authApi.adminRequired, api.update)
    .delete(authApi.adminRequired, api.delete)
}
