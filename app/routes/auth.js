module.exports = app => {
  const api = app.api.auth
  const route = require('../../config/routeList').auth

  app.route(route).post(api.authenticate)
}
