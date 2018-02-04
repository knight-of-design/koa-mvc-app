'use strict';

const device = require('device');

module.exports = () => {
  return async function deviceDetection(context, next) {
    const useragent = context.request.headers['user-agent'];
    const requestDevice = device(useragent, {
      parseUserAgent: true,
    });

    context.request.device = context.request.device || {};
    context.request.device.parser = requestDevice.parser;
    context.request.device.type = requestDevice.type;
    context.request.device.name = requestDevice.model;

    await next();
  };
};
