'use strict';

const _ = require('lodash');
const Router = require('koa-router');
const logService = require('../../services/logService');

module.exports = () => {
  const router = new Router();
  const isGetRegExp = new RegExp(/get/i);

  KoaConfig.routeDetails = {};
  for (const routeKey of _.keys(KoaConfig.routes)) {
    const [verb, url] = routeKey.split(' ');
    const routeValue = KoaConfig.routes[routeKey];
    if (routeValue[0] === '/') {
      router.redirect(url, routeValue, 301);
    } else {
      const [controllerPath, action] = routeValue.split('.');
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const controller = require(`../../controllers/${controllerPath}`);
      if (controller) {
        const actionInstance = controller[action];
        if (actionInstance) {
          router[verb](url, actionInstance);

          // Trim "Controller" off the end of the controllerPath
          if (!KoaConfig.routeDetails[url] || isGetRegExp.test(verb)) {
            KoaConfig.routeDetails[url] = {
              controller: controllerPath.replace(/Controller$/ig, '').toLowerCase(),
              action,
            };
          }
        } else {
          logService.warn(`Unable to find controller action for route: ${routeKey}`);
        }
      } else {
        logService.warn(`Unable to find controller for route: ${routeKey}`);
      }
    }
  }

  return router.routes();
};
