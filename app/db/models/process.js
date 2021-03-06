'use strict'

const { validateDelete } = require('../../validation/process')

module.exports = (sequelize, DataTypes) => {
  const Process = sequelize.define(
    'Process',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      identifier: {
        type: DataTypes.STRING,
        allowNull: false
      },
      year: {
        type: DataTypes.STRING(4),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false
      },
      visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    { paranoid: true, timestamps: true }
  )

  Process.associate = function(models) {
    Process.belongsTo(models.Course, { foreignKey: 'course_id' })
  }

  Process.beforeDestroy(async (process, _) => {
    //validação de restrições em modelos relacionados. (onDelete:'RESTRICT')
    const errors = await validateDelete(process, sequelize.models)
    if (errors) {
      throw { name: 'ForbbidenDeletionError', traceback: 'Process', errors: errors }
    }

    //operações em modelos relacionados (onDelete:'CASCADE' ou 'SET NULL')
    //vazio
  })

  Process.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return Process
}
