'use strict'
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    'Permission',
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
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      method: {
        type: DataTypes.ENUM('GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH')
      },
      urn: {
        type: DataTypes.STRING
      }
    },
    { paranoid: true }
  )

  Permission.associate = function(models) {
    // associations can be defined here
  }

  Permission.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return Permission
}
