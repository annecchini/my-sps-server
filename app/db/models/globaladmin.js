'use strict'
module.exports = (sequelize, DataTypes) => {
  const GlobalAdmin = sequelize.define(
    'GlobalAdmin',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      }
    },
    { paranoid: true }
  )

  GlobalAdmin.associate = function(models) {
    GlobalAdmin.belongsTo(models.User, { foreignKey: 'user_id' })
  }

  GlobalAdmin.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return GlobalAdmin
}
