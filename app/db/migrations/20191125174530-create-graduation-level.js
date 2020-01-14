'use strict'
const uuid = require('uuid/v4')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(
        'GraduationLevels',
        {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now'),
            allowNull: false
          },
          updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('now'),
            allowNull: false
          },
          deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
          }
        },
        {}
      )
      .then(function() {
        return queryInterface.sequelize.query(
          'ALTER TABLE GraduationLevels ADD isActive int (1) GENERATED ALWAYS AS (IF(deletedAt IS NULL,  1, NULL)) VIRTUAL'
        )
      })
      .then(function() {
        return queryInterface.sequelize.query('ALTER TABLE GraduationLevels ADD CONSTRAINT UNIQUE (name, isActive)')
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GraduationLevels')
  }
}
