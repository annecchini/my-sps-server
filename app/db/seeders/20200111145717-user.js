'use strict'

const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let passwordHash = await bcrypt.hash('senhafraca123', 10)

    return queryInterface.bulkInsert(
      'Users',
      [
        { id: uuid(), login: 'comum@ufes.br', password: passwordHash, authorized: true },
        { id: uuid(), login: 'coordenador@ufes.br', password: passwordHash, authorized: true },
        { id: uuid(), login: 'gerente@ufes.br', password: passwordHash, authorized: true },
        { id: uuid(), login: 'administrador@ufes.br', password: passwordHash, authorized: true }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
