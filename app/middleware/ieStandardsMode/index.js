'use strict';

module.exports = () => {
  return async function ieStandardsMode(context, next) {
    if (!context.headers['X-UA-Compatible']) {
      context.set('X-UA-Compatible', 'IE=edge,chrome=1');
    }

    await next();
  };
};
