'use strict'

const uuid = require('uuid/v4')
const routeList = require('../../../config/routeList')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Permissions',
      [
        // User permissions
        {
          id: uuid(),
          name: 'user_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.user}`
        },
        {
          id: uuid(),
          name: 'user_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          path: `${routeList.user}`
        },
        {
          id: uuid(),
          name: 'user_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.user}/:id`
        },
        {
          id: uuid(),
          name: 'user_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          path: `${routeList.user}/:id`
        },
        {
          id: uuid(),
          name: 'user_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          path: `${routeList.user}/:id`
        },
        // GraduationLevel permissions
        {
          id: uuid(),
          name: 'graduationLevel_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.graduationLevel}`
        },
        {
          id: uuid(),
          name: 'graduationLevel_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          path: `${routeList.graduationLevel}`
        },
        {
          id: uuid(),
          name: 'graduationLevel_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.graduationLevel}/:id`
        },
        {
          id: uuid(),
          name: 'graduationLevel_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          path: `${routeList.graduationLevel}/:id`
        },
        {
          id: uuid(),
          name: 'graduationLevel_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          path: `${routeList.graduationLevel}/:id`
        },
        // Course permissions
        {
          id: uuid(),
          name: 'course_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.course}`
        },
        {
          id: uuid(),
          name: 'course_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          path: `${routeList.course}`
        },
        {
          id: uuid(),
          name: 'course_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.course}/:id`
        },
        {
          id: uuid(),
          name: 'course_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          path: `${routeList.course}/:id`
        },
        {
          id: uuid(),
          name: 'course_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          path: `${routeList.course}/:id`
        },
        // Process permissions
        {
          id: uuid(),
          name: 'process_list',
          description: '',
          context: 'COURSE',
          method: 'GET',
          path: `${routeList.process}`
        },
        {
          id: uuid(),
          name: 'process_create',
          description: '',
          context: 'COURSE',
          method: 'POST',
          path: `${routeList.process}`
        },
        {
          id: uuid(),
          name: 'process_read',
          description: '',
          context: 'COURSE',
          method: 'GET',
          path: `${routeList.process}/:id`
        },
        {
          id: uuid(),
          name: 'process_update',
          description: '',
          context: 'COURSE',
          method: 'PUT',
          path: `${routeList.process}/:id`
        },
        {
          id: uuid(),
          name: 'process_delete',
          description: '',
          context: 'COURSE',
          method: 'DELETE',
          path: `${routeList.process}/:id`
        },
        // Role permissions
        {
          id: uuid(),
          name: 'role_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.role}`
        },
        {
          id: uuid(),
          name: 'role_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          path: `${routeList.role}`
        },
        {
          id: uuid(),
          name: 'role_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.role}/:id`
        },
        {
          id: uuid(),
          name: 'role_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          path: `${routeList.role}/:id`
        },
        {
          id: uuid(),
          name: 'role_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          path: `${routeList.role}/:id`
        },
        // UserRole permissions
        {
          id: uuid(),
          name: 'userRole_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.userRole}`
        },
        {
          id: uuid(),
          name: 'userRole_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          path: `${routeList.userRole}`
        },
        {
          id: uuid(),
          name: 'userRole_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.userRole}/:id`
        },
        {
          id: uuid(),
          name: 'userRole_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          path: `${routeList.userRole}/:id`
        },
        {
          id: uuid(),
          name: 'userRole_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          path: `${routeList.userRole}/:id`
        },
        // Permission permissions
        {
          id: uuid(),
          name: 'permission_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.permission}`
        },
        {
          id: uuid(),
          name: 'permission_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          path: `${routeList.permission}`
        },
        {
          id: uuid(),
          name: 'permission_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.permission}/:id`
        },
        {
          id: uuid(),
          name: 'permission_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          path: `${routeList.permission}/:id`
        },
        {
          id: uuid(),
          name: 'permission_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          path: `${routeList.permission}/:id`
        },
        // RolePermission permissions
        {
          id: uuid(),
          name: 'rolePermission_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.rolePermission}`
        },
        {
          id: uuid(),
          name: 'rolePermission_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          path: `${routeList.rolePermission}`
        },
        {
          id: uuid(),
          name: 'rolePermission_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          path: `${routeList.rolePermission}/:id`
        },
        {
          id: uuid(),
          name: 'rolePermission_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          path: `${routeList.rolePermission}/:id`
        },
        {
          id: uuid(),
          name: 'rolePermission_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          path: `${routeList.rolePermission}/:id`
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Permissions', null, {})
  }
}
