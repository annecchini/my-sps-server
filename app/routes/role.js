module.exports = app => {
  const api = app.api.role
  const route = require('../../config/routeList').role

  app
    .route(route)
    .post(api.create)
    .get(api.list)

  app
    .route(`${route}/:id`)
    .get(api.read)
    .put(api.update)
    .delete(api.delete)
}
