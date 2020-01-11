'use strict'

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: { args: [false], msg: 'Não deve ser nulo.' },
        primaryKey: true
      },
      login: {
        type: DataTypes.STRING,
        allowNull: { args: [false], msg: 'Não deve ser nulo.' },
        unique: { args: [true], msg: 'Deve ser único' }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: { args: [false], msg: 'Não deve ser nulo.' }
      },
      authorized: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: { args: [false], msg: 'Não deve ser nulo.' }
      }
    },
    { paranoid: true }
  )

  User.associate = function(models) {
    // associations can be defined here
  }

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
    } else {
      return user
    }
  })

  return User
}
