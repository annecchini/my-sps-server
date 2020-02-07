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
    name: 'RequestError',
    errors: [
      {
        message: `Requisição inválida. (${error.message})`,
        path: 'request'
      }
    ]
  }
}

const invalidUrlErrorMessage = req => {
  return {
    name: 'RequestError',
    errors: [
      {
        message: `Página não encontrada.`,
        path: 'request',
        method: req.method,
        url: req.url
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

const generateUnauthorizedErrorMessage = errors => {
  return {
    name: 'UnauthorizedError',
    errors: errors
  }
}

module.exports = {
  idNotFoundErrorMessage,
  generateValidationErrorMessage,
  invalidRequestErrorMessage,
  invalidUrlErrorMessage,
  generateUnauthorizedErrorMessage
}
