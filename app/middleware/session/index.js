'use strict';

const _ = require('lodash');
const uuid = require('uuid/v4');

module.exports = () => {
  return async function session(context, next) {
    let sid = context.cookies.get(KoaConfig.session.cookieName);
    if (sid) {
      context.session = await context.cache.get(`${KoaConfig.cacheKeyPrefix}${sid}`) || {};
    } else {
      context.session = {};
    }

    await next();

    const hasData = !_.isEmpty(context.session);
    if (hasData) {
      if (!sid) {
        sid = uuid();
      }
      context.cookies.set(KoaConfig.session.cookieName, sid, KoaConfig.session.cookieOptions);
      await context.cache.set(`${KoaConfig.cacheKeyPrefix}${sid}`, context.session, KoaConfig.session.ttl);
    } else if (sid) {
      context.cookies.set(KoaConfig.session.cookieName, null, KoaConfig.session.cookieOptions);
      await context.cache.destroy(`${KoaConfig.cacheKeyPrefix}${sid}`);
    }
  };
};
