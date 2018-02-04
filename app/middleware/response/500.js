'use strict';

const statusCode = 500;
const logService = require('../../services/logService');

module.exports = async function response(context, next) {
  context.serverError = function serverError(data) {
    context.status = statusCode;
    context.state.data = data;
  };

  try {
    await next();
  } catch (ex) {
    context.state.data = ex;
    context.status = statusCode;
  }

  if (context.status !== statusCode) {
    return;
  }

  let logData = context.state.data;
  if (!(logData instanceof Error)) {
    logData = new Error(logData || `Error ${context.status}`);
  }

  logService.error(logData);

  if (KoaConfig.environment === 'production') {
    context.body = {
      ok: false,
    };
  } else if (context.state.data instanceof Error) {
    context.body = {
      ok: false,
      message: context.state.data.message,
      stack: context.state.data.stack,
    };
  } else {
    context.body = {
      ok: false,
      data: context.state.data,
    };
  }

  context.status = statusCode;

  const isAjax = context.request.get('X-Requested-With') === 'XMLHttpRequest';
  const prefersHtml = context.accepts('html');
  const acceptsJson = context.accepts('json', 'text');
  const preferJson = isAjax || !prefersHtml || (acceptsJson && context.is('json'));
  if (!preferJson) {
    try {
      await context.render(`${statusCode}`);
      // HTML rendering will set status to 200 if rendered correctly.
      // Reset to original status after rendering html
      context.status = statusCode;
    } catch (ex) {
      logService.error(ex, context.state.getRequestLoggingDetails());
    }
  }
};
