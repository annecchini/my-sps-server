'use strict'

const uuid = require('uuid/v4')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Assignments',
      [
        { id: uuid(), name: 'Aluno' },
        { id: uuid(), name: 'Tutor presencial' },
        { id: uuid(), name: 'Tutor a distância' },
        { id: uuid(), name: 'Estagiário' },
        { id: uuid(), name: 'Professor' },
        { id: uuid(), name: 'Designer instrucional' },
        { id: uuid(), name: 'Coordenador de curso' }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Assignments', null, {})
  }
}
