module.exports = app => {
  const api = app.api.graduationLevel
  const route = require('../../config/routeList').graduationLevel
  const authApi = app.api.auth
  const { basePath } = require('../lib/express-helpers')

  app
    .route(`${basePath}${route}`)
    .post(authApi.globalPermissionRequired, api.create)
    .get(api.list)

  app
    .route(`${basePath}${route}/:id`)
    .get(api.read)
    .put(authApi.globalPermissionRequired, api.update)
    .delete(authApi.globalPermissionRequired, api.delete)
}
