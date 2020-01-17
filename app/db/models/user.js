'use strict'

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      authorized: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    { paranoid: true }
  )

  User.associate = function(models) {
    // associations can be defined here
  }

  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
  }

  User.beforeDestroy(async (user, _) => {
    //validação de restrições em modelos relacionados. (onDelete:'RESTRICT')
    //vazio

    //operações em modelos relacionados (onDelete:'CASCADE' ou 'SET NULL')
    const t = await sequelize.transaction()
    try {
      await sequelize.models.GlobalAdmin.destroy({ where: { user_id: user.id }, transaction: t })
    } catch (e) {
      await t.rollback()
      throw e
    }
  })

  User.beforeCreate((user, _) => {
    return bcrypt
      .hash(user.password, 10)
      .then(hash => {
        user.password = hash
      })
      .catch(e => {
        throw new Error()
      })
  })

  User.beforeUpdate((user, _) => {
    if (user._changed.password) {
      return bcrypt
        .hash(user.password, 10)
        .then(hash => (user.password = hash))
        .catch(e => {
          throw new Error()
        })
    }
  })

  User.prototype.toJSON = function() {
    let values = Object.assign({}, this.get())
    delete values.password
    delete values.deletedAt
    return values
  }

  return User
}
