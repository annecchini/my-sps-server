'use strict'

const { validateDelete } = require('../../validation/graduationLevel')

module.exports = (sequelize, DataTypes) => {
  const GraduationLevel = sequelize.define(
    'GraduationLevel',
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

  GraduationLevel.associate = function(models) {
    GraduationLevel.hasMany(models.Course, { foreignKey: 'graduationLevel_id' })
  }

  GraduationLevel.beforeDestroy(async (graduationLevel, _) => {
    //validação de restrições em modelos relacionados. (onDelete:'RESTRICT')
    const errors = await validateDelete(graduationLevel, sequelize.models)
    if (errors) {
      throw { name: 'ForbbidenDeletionError', traceback: 'GraduationLevel', errors: errors }
    }

    //operações em modelos relacionados (onDelete:'CASCADE' ou 'SET NULL')
    //vazio
  })

  GraduationLevel.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return GraduationLevel
}
