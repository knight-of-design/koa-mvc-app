'use strict';

const send = require('koa-send');

module.exports = () => {
  return async function staticFiles(context) {
    await send(context, context.path, {
      root: `${KoaConfig.path}/.tmp`,
      maxage: KoaConfig.environment === 'production' ? 31557600000 : 0,
    });
  };
};
