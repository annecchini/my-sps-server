module.exports = {
  mode: process.env.NODE_ENV || 'development',
  development: {
    username: 'username',
    password: 'password',
    database: 'my_sps_server_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '-03:00'
  },
  test: {
    username: 'username',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '-03:00'
  },
  production: {
    username: 'username',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '-03:00'
  }
}
