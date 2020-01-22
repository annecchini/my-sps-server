'use strict'

const uuid = require('uuid/v4')
const routeList = require('../../../config/routeList')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Roles',
      [
        // User permissions
        { id: uuid(), name: 'user_list', description: '', method: 'GET', urn: `${routeList.user}` },
        { id: uuid(), name: 'user_create', description: '', method: 'POST', urn: `${routeList.user}` },
        { id: uuid(), name: 'user_read', description: '', method: 'GET', urn: `${routeList.user}/:id` },
        { id: uuid(), name: 'user_update', description: '', method: 'PUT', urn: `${routeList.user}/:id` },
        { id: uuid(), name: 'user_delete', description: '', method: 'DELETE', urn: `${routeList.user}/:id` }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Permissions', null, {})
  }
}
