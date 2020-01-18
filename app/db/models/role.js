'use strict'
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
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
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false
      },
      global: {
        type: DataTypesBOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    { paranoid: true }
  )

  Role.associate = function(models) {
    // associations can be defined here
  }

  Role.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return Role
}
