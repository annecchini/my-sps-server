'use strict'

const hasRoles = user => Boolean(user.UserRoles.length)

const isAdmin = user => Boolean(user.GlobalAdmins.length)

module.exports = { hasRoles, isAdmin }
