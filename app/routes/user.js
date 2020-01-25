module.exports = app => {
  const route = require('../../config/routeList').user
  const api = app.api.user
  const authApi = app.api.auth

  app
    .route(route)
    .post(api.create)
    .get(authApi.adminRequired, api.list)

  app
    .route(`${route}/:id`)
    .get(authApi.authRequired, api.read)
    .put(api.update)
    .delete(api.delete)
}
