'use strict'

const { validateDelete } = require('../../validation/role')

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
      context: {
        type: DataTypes.ENUM('GLOBAL', 'COURSE'),
        defaultValue: 'GLOBAL',
        allowNull: false
      }
    },
    { paranoid: true, timestamps: true }
  )

  Role.associate = function(models) {
    Role.hasMany(models.UserRole, { foreignKey: 'role_id' })
    Role.hasMany(models.RolePermission, { foreignKey: 'role_id' })
  }

  Role.beforeDestroy(async (role, _) => {
    //validação de restrições em modelos relacionados. (onDelete:'RESTRICT')
    const errors = await validateDelete(role, sequelize.models)
    if (errors) {
      throw { name: 'ForbbidenDeletionError', traceback: 'Role', errors: errors }
    }
    //operações em modelos relacionados (onDelete:'CASCADE' ou 'SET NULL')
    //OPÇÃO 02 - Destruir UserRoles relacionados?
    //vazio
  })

  Role.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.deletedAt
    return values
  }

  return Role
}
