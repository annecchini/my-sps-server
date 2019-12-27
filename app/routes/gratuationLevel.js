module.exports = app => {
  const api = app.api.graduationLevel
  const route = require('../../config/routeList').graduationLevel

  app
    .route(route)
    //.post(authApi.authenticationRequired, authApi.adminRequired, api.create)
    .get(api.list)

  app.route(`${route}/:id`).get(api.specific)
  //.put(authApi.authenticationRequired, authApi.adminRequired, api.update)
  //.delete(authApi.authenticationRequired, authApi.adminRequired, api.delete)
}
