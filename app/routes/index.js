module.exports = app => {
  app.get('/', (req, res) => {
    res.json({ status: 'my-sps api running' })
  })
}