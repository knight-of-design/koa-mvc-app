'use strict';

const _ = require('lodash');
const fs = require('mz/fs');
const path = require('path');
const { Pool } = require('pg');
const bigal = require('bigal');
const logService = require('../../services/logService');

module.exports = {
  startup: async function ormStartup(app) {
    const modelsPath = path.join(__dirname, '../../models');
    try {
      if (KoaConfig.datastores) {
        logService.verbose('Setup orm...');

        const pool = new Pool(KoaConfig.datastores.sql);
        const readonlyPool = KoaConfig.datastores.readonlySql ? new Pool(KoaConfig.datastores.readonlySql) : null;

        const modelsPath = path.join(__dirname, '../../models');
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        const files = await fs.readdir(modelsPath);
        const modelSchemas = files.filter((file) => /.js$/ig.test(file)).map((file) => {
          const fileBasename = path.basename(file, '.js');
          /* eslint-disable global-require, import/no-dynamic-require */
          const schema = require(`${modelsPath}/${fileBasename}`);
          /* eslint-enable global-require, import/no-dynamic-require */

          return _.merge({
            globalId: fileBasename,
            tableName: fileBasename.toLowerCase(),
          }, schema);
        });

        app.orm = app.orm || {};
        await bigal.initialize({
          modelSchemas,
          pool,
          readonlyPool,
          expose: (model, modelSchema) => {
            // NOTE: Uncomment the following line to expose model classes to the global scope
            // global[modelSchema.globalId] = model;

            app.orm[modelSchema.globalId] = model;
          },
        });

        logService.verbose('Done!');
      } else {
        logService.verbose('Skipping orm config. No datastores defined.');
      }
    } catch (ex) {
      logService.warn(`No waterline models detected in ${modelsPath}`);
    }
  },
};
