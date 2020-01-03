module.exports = app => {
  const api = app.api.graduationLevel
  const route = require('../../config/routeList').graduationLevel

  app
    .route(route)
    .post(api.create)
    .get(api.list)

  app
    .route(`${route}/:id`)
    .get(api.read)
    .put(api.update)
  //.delete(authApi.authenticationRequired, authApi.adminRequired, api.delete)
}
