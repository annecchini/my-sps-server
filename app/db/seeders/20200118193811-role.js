'use strict'

const uuid = require('uuid/v4')

module.exports = {
  up: (queryInterface, Sequelize) => {
    //insert roles on table
    return queryInterface.bulkInsert(
      'Roles',
      [
        {
          id: uuid(),
          name: 'Gerente',
          description: 'Usuário para operar todas as plataformas e recursos gerais da plataforma.',
          context: 'GLOBAL'
        },
        {
          id: uuid(),
          name: 'Coordenador',
          description: 'Usuário para fazer as oeprações de um curso especifico.',
          context: 'COURSE'
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {})
  }
}
