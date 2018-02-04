'use strict';

const startupTime = process.hrtime();

const Koa = require('koa');
const config = require('./config');

global.KoaConfig = config;

const logService = require('./app/services/logService');
const metricService = require('./app/services/metricService');
const plugins = require('./app/plugins');
const middleware = require('./app/middleware');

async function loadKoaApplication() {
  const app = new Koa();
  await plugins.startup(app);
  app.use(middleware());
  app.listen(config.port);

  process.on('SIGINT', () => {
    (async function shutdown() {
      await plugins.shutdown();

      process.exit();
    }()).catch((ex) => {
      logService.error(ex);
      process.exit();
    });
  });

  logService.info(`Listening on port ${config.port}`);
  metricService.duration('application.startupTime', startupTime);
}

module.exports.load = loadKoaApplication;
