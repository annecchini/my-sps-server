module.exports = app => {
  const api = app.api.course
  const route = require('../../config/routeList').course

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
