module.exports = {
  mode: process.env.NODE_ENV || 'development',
  development: {
    username: 'root',
    password: 'root',
    database: 'my_sps_server_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '-03:00'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '-03:00'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '-03:00'
  }
}
