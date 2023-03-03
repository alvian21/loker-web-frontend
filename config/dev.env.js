'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_ROOT_API:'"http://127.0.0.1:7610/"',
  VUE_APP_APPS_NAME:'"Loker Web"'
})
