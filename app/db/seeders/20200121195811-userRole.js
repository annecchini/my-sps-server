'use strict'

const uuid = require('uuid/v4')

const loadUsers = async queryInterface => {
  try {
    return await queryInterface.sequelize.query(`SELECT id, login FROM Users`, {
      type: queryInterface.sequelize.QueryTypes.SELECT
    })
  } catch (e) {
    console.log('Não foi possivel carregar users.')
    throw e
  }
}

const loadRoles = async queryInterface => {
  try {
    return await queryInterface.sequelize.query(`SELECT id, name FROM Roles`, {
      type: queryInterface.sequelize.QueryTypes.SELECT
    })
  } catch (e) {
    console.log('Não foi possivel carregar roles.')
    throw e
  }
}

const loadCourses = async queryInterface => {
  try {
    return await queryInterface.sequelize.query(`SELECT id, name FROM Courses`, {
      type: queryInterface.sequelize.QueryTypes.SELECT
    })
  } catch (e) {
    console.log('Não foi possivel carregar courses.')
    throw e
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await loadUsers(queryInterface)
    let user_ids = []
    for (const el of users) {
      user_ids[el.login] = el.id
    }

    const roles = await loadRoles(queryInterface)
    let role_ids = []
    for (const el of roles) {
      role_ids[el.name] = el.id
    }

    const courses = await loadCourses(queryInterface)
    let course_ids = []
    for (const el of courses) {
      course_ids[el.name] = el.id
    }

    return queryInterface.bulkInsert(
      'UserRoles',
      [
        {
          id: uuid(),
          user_id: user_ids['gerente@ufes.br'],
          role_id: role_ids['Gerente'],
          course_id: null
        },
        {
          id: uuid(),
          user_id: user_ids['coordenador@ufes.br'],
          role_id: role_ids['Coordenador'],
          course_id: course_ids['Direitos Humanos']
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRoles', null, {})
  }
}
