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
          urn: `${routeList.user}`
        },
        {
          id: uuid(),
          name: 'user_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          urn: `${routeList.user}`
        },
        {
          id: uuid(),
          name: 'user_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.user}/:id`
        },
        {
          id: uuid(),
          name: 'user_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          urn: `${routeList.user}/:id`
        },
        {
          id: uuid(),
          name: 'user_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          urn: `${routeList.user}/:id`
        },
        // GraduationLevel permissions
        {
          id: uuid(),
          name: 'graduationLevel_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.graduationLevel}`
        },
        {
          id: uuid(),
          name: 'graduationLevel_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          urn: `${routeList.graduationLevel}`
        },
        {
          id: uuid(),
          name: 'graduationLevel_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.graduationLevel}/:id`
        },
        {
          id: uuid(),
          name: 'graduationLevel_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          urn: `${routeList.graduationLevel}/:id`
        },
        {
          id: uuid(),
          name: 'graduationLevel_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          urn: `${routeList.graduationLevel}/:id`
        },
        // Course permissions
        {
          id: uuid(),
          name: 'course_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.course}`
        },
        {
          id: uuid(),
          name: 'course_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          urn: `${routeList.course}`
        },
        {
          id: uuid(),
          name: 'course_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.course}/:id`
        },
        {
          id: uuid(),
          name: 'course_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          urn: `${routeList.course}/:id`
        },
        {
          id: uuid(),
          name: 'course_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          urn: `${routeList.course}/:id`
        },
        // Process permissions
        {
          id: uuid(),
          name: 'process_list',
          description: '',
          context: 'COURSE',
          method: 'GET',
          urn: `${routeList.process}`
        },
        {
          id: uuid(),
          name: 'process_create',
          description: '',
          context: 'COURSE',
          method: 'POST',
          urn: `${routeList.process}`
        },
        {
          id: uuid(),
          name: 'process_read',
          description: '',
          context: 'COURSE',
          method: 'GET',
          urn: `${routeList.process}/:id`
        },
        {
          id: uuid(),
          name: 'process_update',
          description: '',
          context: 'COURSE',
          method: 'PUT',
          urn: `${routeList.process}/:id`
        },
        {
          id: uuid(),
          name: 'process_delete',
          description: '',
          context: 'COURSE',
          method: 'DELETE',
          urn: `${routeList.process}/:id`
        },
        // Role permissions
        {
          id: uuid(),
          name: 'role_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.role}`
        },
        {
          id: uuid(),
          name: 'role_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          urn: `${routeList.role}`
        },
        {
          id: uuid(),
          name: 'role_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.role}/:id`
        },
        {
          id: uuid(),
          name: 'role_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          urn: `${routeList.role}/:id`
        },
        {
          id: uuid(),
          name: 'role_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          urn: `${routeList.role}/:id`
        },
        // UserRole permissions
        {
          id: uuid(),
          name: 'userRole_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.userRole}`
        },
        {
          id: uuid(),
          name: 'userRole_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          urn: `${routeList.userRole}`
        },
        {
          id: uuid(),
          name: 'userRole_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.userRole}/:id`
        },
        {
          id: uuid(),
          name: 'userRole_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          urn: `${routeList.userRole}/:id`
        },
        {
          id: uuid(),
          name: 'userRole_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          urn: `${routeList.userRole}/:id`
        },
        // Permission permissions
        {
          id: uuid(),
          name: 'permission_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.permission}`
        },
        {
          id: uuid(),
          name: 'permission_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          urn: `${routeList.permission}`
        },
        {
          id: uuid(),
          name: 'permission_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.permission}/:id`
        },
        {
          id: uuid(),
          name: 'permission_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          urn: `${routeList.permission}/:id`
        },
        {
          id: uuid(),
          name: 'permission_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          urn: `${routeList.permission}/:id`
        },
        // RolePermission permissions
        {
          id: uuid(),
          name: 'rolePermission_list',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.rolePermission}`
        },
        {
          id: uuid(),
          name: 'rolePermission_create',
          description: '',
          context: 'GLOBAL',
          method: 'POST',
          urn: `${routeList.rolePermission}`
        },
        {
          id: uuid(),
          name: 'rolePermission_read',
          description: '',
          context: 'GLOBAL',
          method: 'GET',
          urn: `${routeList.rolePermission}/:id`
        },
        {
          id: uuid(),
          name: 'rolePermission_update',
          description: '',
          context: 'GLOBAL',
          method: 'PUT',
          urn: `${routeList.rolePermission}/:id`
        },
        {
          id: uuid(),
          name: 'rolePermission_delete',
          description: '',
          context: 'GLOBAL',
          method: 'DELETE',
          urn: `${routeList.rolePermission}/:id`
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Permissions', null, {})
  }
}
