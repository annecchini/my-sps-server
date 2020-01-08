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
    }

    return message
  }

  return error
}
