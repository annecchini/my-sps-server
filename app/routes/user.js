module.exports = app => {
  const route = require('../../config/routeList').user
  const api = app.api.user
  const authApi = app.api.auth

  app
    .route(route)
    .post(authApi.accessLevelRequired, api.create)
    .get(authApi.adminRequired, api.list)

  app
    .route(`${route}/:id`)
    .get(authApi.accessLevelRequired, api.read)
    .put(api.update)
    .delete(api.delete)
}
