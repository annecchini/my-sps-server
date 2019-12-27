'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Processes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
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
        type: DataTypes.TEXT,
        allowNull: true
      },
      visible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Processes')
  }
}
