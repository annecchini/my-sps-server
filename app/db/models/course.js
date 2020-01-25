'use strict'

const { validateDelete } = require('../../validation/course')

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
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      }
    },
    { paranoid: true, timestamps: true }
  )

  Course.associate = function(models) {
    Course.belongsTo(models.GraduationLevel, { foreignKey: 'graduationLevel_id' })
    Course.hasMany(models.UserRole, { foreignKey: 'course_id' })
  }

  Course.beforeDestroy(async (course, _) => {
    //validação de restrições em modelos relacionados. (onDelete:'RESTRICT')
    const errors = await validateDelete(course, sequelize.models)
    if (errors) {
      throw { name: 'ForbbidenDeletionError', traceback: 'Course', errors: errors }
    }

    //operações em modelos relacionados (onDelete:'CASCADE' ou 'SET NULL')
    //vazio
  })

  Course.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return Course
}
