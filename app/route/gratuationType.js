module.exports = app => {
  app
    .route('/v1/graduationType')
    //.post(authApi.authenticationRequired, authApi.adminRequired, api.create)
    .get((req, res) => {
      res.json({ res: 'get' })
    })

  app.route('/v1/graduationType/:id').get((req, res) => {
    res.json({ res: 'get with id' })
  })
  //.put(authApi.authenticationRequired, authApi.adminRequired, api.update)
  //.delete(authApi.authenticationRequired, authApi.adminRequired, api.delete)
}
