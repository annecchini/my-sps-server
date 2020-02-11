'use strict'

const siteConfig = require('../../config/site')

const url = new URL(siteConfig.url)
const basePath = url.pathname !== '/' ? url.pathname : ''

module.exports = { basePath }
