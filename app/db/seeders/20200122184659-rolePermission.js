'use strict'

const uuid = require('uuid/v4')

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

const loadPermissions = async queryInterface => {
  try {
    return await queryInterface.sequelize.query(`SELECT id, name FROM Permissions`, {
      type: queryInterface.sequelize.QueryTypes.SELECT
    })
  } catch (e) {
    console.log('Não foi possivel carregar permissions.')
    throw e
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = await loadRoles(queryInterface)
    let role_ids = []
    for (const el of roles) {
      role_ids[el.name] = el.id
    }

    const permissions = await loadPermissions(queryInterface)
    let permission_ids = []
    for (const el of permissions) {
      permission_ids[el.name] = el.id
    }

    return queryInterface.bulkInsert(
      'RolePermissions',
      [
        //permissões de gerente user
        {
          id: uuid(),
          role_id: role_ids['Gerente'],
          permission_id: permission_ids['user_list']
        },
        {
          id: uuid(),
          role_id: role_ids['Gerente'],
          permission_id: permission_ids['user_create']
        },
        {
          id: uuid(),
          role_id: role_ids['Gerente'],
          permission_id: permission_ids['user_read']
        },
        {
          id: uuid(),
          role_id: role_ids['Gerente'],
          permission_id: permission_ids['user_update']
        },
        //permissões de gerente course
        {
          id: uuid(),
          role_id: role_ids['Gerente'],
          permission_id: permission_ids['course_list']
        },
        {
          id: uuid(),
          role_id: role_ids['Gerente'],
          permission_id: permission_ids['course_create']
        },
        {
          id: uuid(),
          role_id: role_ids['Gerente'],
          permission_id: permission_ids['course_read']
        },
        {
          id: uuid(),
          role_id: role_ids['Gerente'],
          permission_id: permission_ids['course_update']
        },
        //permissões de gerente process
        {
          id: uuid(),
          role_id: role_ids['Gerente'],
          permission_id: permission_ids['process_list']
        },
        {
          id: uuid(),
          role_id: role_ids['Gerente'],
          permission_id: permission_ids['process_create']
        },
        {
          id: uuid(),
          role_id: role_ids['Gerente'],
          permission_id: permission_ids['process_read']
        },
        {
          id: uuid(),
          role_id: role_ids['Gerente'],
          permission_id: permission_ids['process_update']
        },
        //permissões de coordenador process
        {
          id: uuid(),
          role_id: role_ids['Coordenador'],
          permission_id: permission_ids['process_list']
        },
        {
          id: uuid(),
          role_id: role_ids['Coordenador'],
          permission_id: permission_ids['process_create']
        },
        {
          id: uuid(),
          role_id: role_ids['Coordenador'],
          permission_id: permission_ids['process_read']
        },
        {
          id: uuid(),
          role_id: role_ids['Coordenador'],
          permission_id: permission_ids['process_update']
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RolePermissions', null, {})
  }
}
