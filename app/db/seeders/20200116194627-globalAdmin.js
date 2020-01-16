'use strict'

const uuid = require('uuid/v4')

const loadUserAdmin = async queryInterface => {
  try {
    return await queryInterface.sequelize.query(`SELECT id, login FROM Users where login=\'administrador@ufes.br\'`, {
      type: queryInterface.sequelize.QueryTypes.SELECT
    })
  } catch (e) {
    console.log('Não foi possivel carregar o usuário administrador.')
    throw e
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userAdmins = await loadUserAdmin(queryInterface)
    let user_ids = []
    for (const el of userAdmins) {
      user_ids[el.login] = el.id
    }

    //insert Courses on table
    return queryInterface.bulkInsert(
      'GlobalAdmins',
      [
        {
          id: uuid(),
          user_id: user_ids['administrador@ufes.br']
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GlobalAdmins', null, {})
  }
}
