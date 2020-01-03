'use strict'

require
const { validateName } = require('../../validation/graduationLevel')

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
        unique: { args: [true], msg: 'Deve ser único' },
        allowNull: { args: [false], msg: 'Não deve ser nulo.' },
        validate: {
          validateName: validateName
        }
      }
    },
    {
      paranoid: true
    }
  )
  GraduationLevel.associate = function(models) {}

  GraduationLevel.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return GraduationLevel
}
