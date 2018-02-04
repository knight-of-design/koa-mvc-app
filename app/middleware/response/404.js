'use strict';

const statusCode = 404;
const logService = require('../../services/logService');

module.exports = async function response(context, next) {
  context.notFound = function notFound(data) {
    context.status = statusCode;
    context.state.data = data;
  };

  await next();

  if (context.status !== statusCode) {
    return;
  }

  context.status = statusCode;
  context.body = {
    ok: false,
    url: context.originalUrl,
  };

  if (context.state.data) {
    context.body.message = context.state.data.message || context.state.data;
  }

  const isAjax = context.request.get('X-Requested-With') === 'XMLHttpRequest';
  const prefersHtml = context.accepts('html');
  const acceptsJson = context.accepts('json', 'text');
  const preferJson = isAjax || !prefersHtml || (acceptsJson && context.is('json'));
  if (!preferJson) {
    try {
      context.state.data = context.state.data || null;
      await context.render(`${statusCode}`);
      // HTML rendering will set status to 200 if rendered correctly.
      // Reset to original status after rendering html
      context.status = statusCode;
    } catch (ex) {
      logService.error(ex, context.state.getRequestLoggingDetails());
    }
  }
};
