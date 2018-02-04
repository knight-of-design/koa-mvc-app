'use strict';

const ejs = require('./ejs');
const orm = require('./orm');
const librato = require('./librato');

module.exports = {
  startup: (app) => {
    return Promise.all([
      ejs.startup(app),
      orm.startup(app),
      librato.startup(app),
    ]);
  },
  shutdown: () => {
    return Promise.all([
      librato.shutdown(),
    ]);
  },
};
