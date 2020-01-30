module.exports = app => {
  const route = require('../../config/routeList').user
  const api = app.api.user
  const authApi = app.api.auth

  app
    .route(route)
    .post(authApi.globalPermissionRequired, api.create)
    .get(authApi.globalPermissionRequired, api.list)

  app
    .route(`${route}/:id`)
    .get(authApi.globalPermissionRequired, api.read)
    .put(authApi.globalPermissionRequired, api.update)
    .delete(authApi.globalPermissionRequired, api.delete)
}
