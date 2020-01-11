'use strict'

const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')

let passwordHash = bcrypt.hashSync('senhafraca123', 10)

module.exports = {
  up: (queryInterface, Sequelize) => {
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
