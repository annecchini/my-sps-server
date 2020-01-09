'use strict'

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: { args: [false], msg: 'Não deve ser nulo.' },
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: { args: [false], msg: 'Não deve ser nulo.' },
        unique: { args: [true], msg: 'Deve ser único' }
      },
      description: { type: DataTypes.STRING }
    },
    {
      paranoid: true
    }
  )

  Course.associate = function(models) {
    Course.belongsTo(models.GraduationLevel, {
      foreignKey: 'graduationLevel_id'
    })
  }

  Course.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return Course
}
