module.exports = app => {
  const route = require('../../config/routeList').user
  const api = app.api.user
  const authApi = app.api.auth
  const { basePath } = require('../utils/express-helpers')

  app
    .route(`${basePath}${route}`)
    .post(authApi.globalPermissionRequired, api.create)
    .get(authApi.globalPermissionRequired, api.list)

  app
    .route(`${basePath}${route}/:id`)
    .get(authApi.globalPermissionRequired, api.read)
    .put(authApi.globalPermissionRequired, api.update)
    .delete(authApi.globalPermissionRequired, api.delete)
}
