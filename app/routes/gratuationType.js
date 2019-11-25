module.exports = app => {
  const api = app.api.graduationType
  app
    .route('/v1/graduationType')
    //.post(authApi.authenticationRequired, authApi.adminRequired, api.create)
    .get(api.list)

  app.route('/v1/graduationType/:id').get(api.specific)
  //.put(authApi.authenticationRequired, authApi.adminRequired, api.update)
  //.delete(authApi.authenticationRequired, authApi.adminRequired, api.delete)
}
