'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Processes',
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true
        },
        course_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Courses',
            key: 'id'
          }
        },
        identifier: {
          type: Sequelize.STRING,
          allowNull: false
        },
        year: {
          type: Sequelize.STRING(4),
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          defaultValue: '',
          allowNull: false
        },
        visible: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
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
        },
        isActive: {
          type: 'INT(1) GENERATED ALWAYS AS (IF(deletedAt IS NULL,  1, NULL)) VIRTUAL'
        }
      },
      {
        uniqueKeys: {
          unique_identifier_year_isActive: {
            fields: ['identifier', 'year', 'isActive']
          }
        }
      }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Processes')
  }
}
