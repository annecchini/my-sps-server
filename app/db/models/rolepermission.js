'use strict'
module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    'RolePermission',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      }
    },
    { paranoid: true, timestamps: true }
  )

  RolePermission.associate = function(models) {
    RolePermission.belongsTo(models.Role, { foreignKey: 'role_id' })
    RolePermission.belongsTo(models.Permission, { foreignKey: 'permission_id' })
  }

  RolePermission.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return RolePermission
}
