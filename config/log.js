'use strict';

const winston = require('winston');
const util = require('util');
const _ = require('lodash');

const log = {
  info(...args) {
    log._log('info', ...args);
  },

  warn(...args) {
    log._log('warn', ...args);
  },

  error(...args) {
    log._log('error', ...args);
  },

  _log(level, ...args) {
    const pieces = [];
    let meta = null;
    _.each(args, (arg) => {
      if (typeof arg === 'object' && arg instanceof Error && arg.stack && !arg.inspect) {
        pieces.push(arg.stack);
      } else if (typeof arg === 'object') {
        // General Objects
        // Assume all meta objects will have the url of the request
        if (typeof arg.url === 'undefined') {
          pieces.push(util.inspect(arg));
        } else {
          meta = arg;
        }
      } else {
        pieces.push(arg);
      }
    });

    // If there were no argument specified, at least log out a stacktrace
    if (!pieces.length) {
      const unknownError = new Error("Unknown error");
      pieces.push(unknownError.stack);
    }

    const logString = util.format(...pieces);
    this.logger.log(level, logString, meta);
  },

  /**
   * Specify the logger to use.
   * @see https://github.com/winstonjs/winston#instantiating-your-own-logger
   */
  logger: new winston.Logger({
    level: 'info',
    exitOnError: false,
    transports: [
      new winston.transports.Console({
        prettyPrint: true,
        colorize: true,
      }),
    ],
  }),
};

/**
 * Logging Configuration
 * (app.config.log)
 */
module.exports = log;
