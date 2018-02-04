'use strict';

//const Redis = require('ioredis');

// const redisClient = new Redis({
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379,
//
//   // https://github.com/luin/ioredis/issues/139#issuecomment-138275522
//   retryStrategy: (times) => {
//     if (times < 2) {
//       // retry connection timeouts after 500ms
//       return 500;
//     }
//     // A return value that is not a number will stop ioredis from trying to reconnect
//     return "";
//   },
//   // https://github.com/luin/ioredis#reconnect-on-error
//   reconnectOnError: (err) => {
//     const targetError = 'READONLY';
//     if (err.message.slice(0, targetError.length) === targetError) {
//       // Only reconnect when the error starts with "READONLY"
//       // this error is typically returned when switching between master and slave instances
//       return true;
//     }
//   },
// });

module.exports = {
  port: 1339,

  // datastores: {
  //   sql: {
  //     host: process.env.SQL_HOST || '127.0.0.1',
  //     database: process.env.SQL_DATABASE || 'koa_mvc',
  //     user: process.env.SQL_USER || 'koa_mvc',
  //     password: process.env.SQL_PASSWORD || 'koa_mvc',
  //     ssl: false,
  //   },
  // },

  // cache: redisClient,

  views: {
    cache: false,
  },

  librato: {
    simulate: true,
    prefix: 'development.',
  },
};
