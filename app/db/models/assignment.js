'use strict'

const { validateDelete } = require('../../validation/assignment')

module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define(
    'Assignment',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { paranoid: true, timestamps: true }
  )

  Assignment.associate = function(models) {
    // associations can be defined here
  }

  Assignment.beforeDestroy(async (assignment, _) => {
    //validação de restrições em modelos relacionados. (onDelete:'RESTRICT')
    const errors = await validateDelete(assignment, sequelize.models)
    if (errors) {
      throw { name: 'ForbbidenDeletionError', traceback: 'Assignment', errors: errors }
    }

    //operações em modelos relacionados (onDelete:'CASCADE' ou 'SET NULL')
    //vazio
  })

  Assignment.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return Assignment
}
