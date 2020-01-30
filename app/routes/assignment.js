module.exports = app => {
  const api = app.api.assignment
  const route = require('../../config/routeList').assignment
  const authApi = app.api.auth

  app
    .route(route)
    .post(authApi.globalPermissionRequired, api.create)
    .get(api.list)

  app
    .route(`${route}/:id`)
    .get(api.read)
    .put(authApi.globalPermissionRequired, api.update)
    .delete(authApi.globalPermissionRequired, api.delete)
}
