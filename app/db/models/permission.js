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
      method: {
        type: Sequelize.STRING
      },
      urn: {
        type: Sequelize.STRING
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
