module.exports = app => {
  let error = {}

  error.parse = (code, e) => {
    let message = {}

    switch (code) {
      case 'user-400':
        message = {
          code,
          userMessage: 'Requisição inválida.',
          devMessage: e
        }
        break
      case 'user-401':
        message = {
          code,
          userMessage: 'Operação não autorizada.',
          devMessage: e
        }
        break
      case 'user-403':
        message = {
          code,
          userMessage: 'Operação proibida.',
          devMessage: e
        }
        break
      case 'user-500':
        message = {
          code,
          userMessage: 'Erro interno do servidor. Contate o administrador.',
          devMessage: e
        }
        break
    }

    return message
  }

  return error
}
