'use strict'

const siteConfig = require('../../config/site')

const basePath = new URL(siteConfig.url).pathname

module.exports = { basePath }
