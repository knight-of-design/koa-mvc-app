'use strict';

module.exports = async function response(context, next) {
  context.negotiate = function negotiate(error) {
    context.status = error.status || 500;
    context.state.data = error;
  };

  await next();
};
