module.exports = app => {
  const api = app.api.graduationType
  const route = require('../../config/routeList').graduationType

  app
    .route(route)
    //.post(authApi.authenticationRequired, authApi.adminRequired, api.create)
    .get(api.list)

  app.route(`${route}/:id`).get(api.specific)
  //.put(authApi.authenticationRequired, authApi.adminRequired, api.update)
  //.delete(authApi.authenticationRequired, authApi.adminRequired, api.delete)
}
