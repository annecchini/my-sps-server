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

  Role.beforeDestroy(async (role, _) => {
    //validação de restrições em modelos relacionados. (onDelete:'RESTRICT')
    //OPÇÃO 01 - Restringir deleção se estiver associado a um UserRole?
    //vazio
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
