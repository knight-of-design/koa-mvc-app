'use strict';

const _ = require('lodash');

module.exports = () => {
  return async function flashMiddleware(context, next) {
    function flash(severity, message) {
      if (severity && message) {
        context.session.flash[severity] = context.session.flash[severity] || [];
        if (_.isArray(message)) {
          context.session.flash[severity].push(...message);
        } else {
          context.session.flash[severity].push(message);
        }
      } else if (severity) {
        const messages = context.session.flash[severity] || [];
        delete context.session.flash[severity];
        return messages;
      } else {
        const messages = context.session.flash;
        context.session.flash = {};
        return messages;
      }
    }

    context.session.flash = context.session.flash || {};
    context.flash = flash;
    context.state.flash = flash;

    await next();

    if (_.isEmpty(context.session.flash)) {
      delete context.session.flash;
    }
  };
};
