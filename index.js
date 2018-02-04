'use strict';

const app = require('./app');
const logService = require('./app/services/logService');

app.load().catch((ex) => {
  logService.error(ex);
  throw ex;
});
