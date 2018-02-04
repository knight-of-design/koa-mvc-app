'use strict';

const compose = require('koa-compose');
const compress = require('koa-compress');
const cors = require('kcors');
const favicon = require('koa-favicon');
const helmet = require('koa-helmet');

//const cache = require('./cache');
const device = require('./device');
const flash = require('./flash');
const ieStandardsMode = require('./ieStandardsMode');
const policies = require('./policies');
const removeTrailingSlash = require('./removeTrailingSlash');
const requestLoggingDetails = require('./requestLoggingDetails');
const response = require('./response');
const responseTime = require('./responseTime');
const routes = require('./routes');
const session = require('./session');
const staticFiles = require('./staticFiles');
const staticFilesMissingFingerprint = require('./staticFilesMissingFingerprint');

module.exports = () => {
  return compose([
    responseTime,
    helmet({
      frameguard: {
        action: 'deny',
      },
      xssFilter: {
        setOnOldIE: true,
      },
    }),
    cors(),
    //    cache(),
    session(),
    flash(),
    device(),
    ieStandardsMode(),
    requestLoggingDetails(),
    response(),
    removeTrailingSlash(),
    compress(),
    policies(),
    routes(),
    favicon(`${KoaConfig.path}/assets/favicon.ico`),
    staticFiles(),
    staticFilesMissingFingerprint(),
  ]);
};
