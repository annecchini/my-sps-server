'use strict'
const { validateName } = require('../../validation/course')

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
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
        allowNull: { args: [false], msg: 'Não deve ser nulo.' }
      },
      description: { type: DataTypes.STRING }
    },
    {
      paranoid: true,
      validate: {
        validateName: validateName(sequelize)
      }
    }
  )
  Course.associate = function(models) {
    Course.belongsTo(models.GraduationLevel, {
      foreignKey: 'graduationLevel_id'
    })
  }
  return Course
}
