module.exports = app => {
  let error = {}

  error.parse = (code, e) => {
    let message = {}

    switch (code) {
      case 'request-400':
        message = {
          code,
          userMessage: 'Requisição inválida.',
          devMessage: e
        }
        break
      case 'request-404':
        message = {
          code,
          userMessage: 'Página não encontrada.',
          devMessage: e
        }
        break
    }

    return message
  }

  return error
}
