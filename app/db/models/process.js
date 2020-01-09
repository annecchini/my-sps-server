'use strict'
module.exports = (sequelize, DataTypes) => {
  const Process = sequelize.define(
    'Process',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: { args: [false], msg: 'Não deve ser nulo.' },
        primaryKey: true
      },
      identifier: {
        type: DataTypes.STRING,
        allowNull: { args: [false], msg: 'Não deve ser nulo.' }
      },
      year: {
        type: DataTypes.STRING(4),
        allowNull: { args: [false], msg: 'Não deve ser nulo.' }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: { args: [false], msg: 'Não deve ser nulo.' }
      },
      visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: { args: [false], msg: 'Não deve ser nulo.' }
      }
    },
    { paranoid: true }
  )

  Process.associate = function(models) {
    Process.belongsTo(models.Course, { foreignKey: 'course_id' })
  }

  Process.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return Process
}
