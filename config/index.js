'use strict';

const _ = require('lodash');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = require('./env');
const log = require('./log');
const policies = require('./policies');
const routes = require('./routes');
const session = require('./session');

const environmentOverrides = environmentConfig[environment] || {};

module.exports = _.merge({
  path: path.join(__dirname, '..'),
  environment,
  log,
  policies,
  routes,
  session,
  views: {},
  ejsMinifyOptions: {
    collapseWhitespace: true,
    removeComments: true,
  },
}, environmentOverrides);
