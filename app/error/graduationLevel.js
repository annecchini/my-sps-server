module.exports = app => {
  let error = {}

  error.parse = (code, e) => {
    let message = {}

    switch (code) {
      case 'graduationLevel-400':
        message = {
          code,
          userMessage: 'Requisição inválida.',
          devMessage: e
        }
        break
      case 'graduationLevel-401':
        message = {
          code,
          userMessage: 'Operação não autorizada.',
          devMessage: e
        }
        break
      case 'graduationLevel-500':
        message = {
          code,
          userMessage: 'Erro interno do servidor. Contate o administrador.',
          devMessage: e
        }
        break
      case 'graduationLevel-03':
        message = {
          code,
          userMessage: 'Não foi localizado o tipo de formação com o ID informado.',
          devMessage: e
        }
        break
    }

    return message
  }

  return error
}