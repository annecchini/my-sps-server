const { invalidUrlErrorMessage } = require('./error-helpers')

module.exports = app => {
  const error = app.error.request

  //Depois de todas as rotas definidas. Lançar esse middleware para cuidar das rotas que não existem.
  app.route('*').all(function(req, res) {
    return res.status(404).json(error.parse('request-404', invalidUrlErrorMessage(req)))
  })
}
