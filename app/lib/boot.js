module.exports = app => {
  const port = process.env.PORT || app.config.site.port || 3000

  app.db.models.index.sequelize.sync().done(() => {
    app.listen(port, () => {
      console.log('Server running! - port: ' + port)
    })
  })
}
