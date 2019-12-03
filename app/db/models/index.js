'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const configDatabase = require('../../../config/database')

module.exports = app => {
  const db_conf = configDatabase[configDatabase.mode]
  const db = {}
  let sequelize
  if (db_conf.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], db_conf)
  } else {
    sequelize = new Sequelize(db_conf.database, db_conf.username, db_conf.password, db_conf)
  }

  fs.readdirSync(__dirname)
    .filter(file => {
      return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(__dirname, file))
      db[model.name] = model
    })

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize

  return db
}
