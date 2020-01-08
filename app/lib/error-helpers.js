'use strict'

const idNotFoundErrorMessage = () => {
  return {
    name: 'ValidationError',
    errors: [
      {
        message: 'Não existe um elemento com o identificador enviado.',
        path: 'id'
      }
    ]
  }
}

const invalidRequestErrorMessage = error => {
  return {
    name: 'ValidationError',
    errors: [
      {
        message: `Requisição inválida. (${error.message})`,
        path: 'request'
      }
    ]
  }
}

const generateValidationErrorMessage = errors => {
  return {
    name: 'ValidationError',
    errors: errors
  }
}

module.exports = { idNotFoundErrorMessage, generateValidationErrorMessage, invalidRequestErrorMessage }
