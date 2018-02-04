'use strict';

const send = require('koa-send');

module.exports = () => {
  return async function staticFilesMissingFingerprint(context, next) {
    if (context.status === 404) {
      const hashUrl = /^(.*)\.[a-zA-Z0-9]{8}\.(js|css|png|jpg|jpeg|gif|ico|otf|eot|svg|ttf|woff)$/ig;

      if (context.path.match(hashUrl)) {
        const pathWithoutFingerprint = context.path.replace(hashUrl, '$1.$2');
        await send(context, pathWithoutFingerprint, {
          root: `${KoaConfig.path}/.tmp`,
        });
      }
    }

    await next();
  };
};
