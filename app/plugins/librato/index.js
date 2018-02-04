'use strict';

const os = require('os');
const _ = require('lodash');
const librato = require('librato-node');
const logService = require('../../services/logService');

module.exports = {
  startup: async function libratoPluginStartup() {
    try {
      librato.configure(_.merge({
        prefix: '',
        source: os.hostname(),
      }, KoaConfig.librato));
      librato.on('error', (err) => {
        logService.warn(err);
      });
      librato.start();
    } catch (ex) {
      logService.warn(ex);
    }
  },
  shutdown: async function libratoPluginShutdown() {
    await new Promise((resolve) => {
      try {
        librato.stop((err) => {
          if (err) {
            logService.error(err);
          }

          resolve();
        });
      } catch (ex) {
        logService.error(ex);
        resolve();
      }
    });
  },
};
