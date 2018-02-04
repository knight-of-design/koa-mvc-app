'use strict';

const winston = require('winston');
// const Redis = require('ioredis');

// let redisHost = 'localhost';
// let redisPort = 6379;
// if (process.env.REDIS_URL) {
//   redisHost = process.env.REDIS_URL.split(":")[1].replace("//", "");
//   redisPort = parseInt(process.env.REDIS_URL.split(":")[2]);
// }
//
// const redisSentinels = (process.env.REDIS_SENTINEL_URLS || '').split(',').map((sentinelUrl) => {
//   const [host, port] = sentinelUrl.split(':');
//   return {
//     host,
//     port,
//   };
// });

// const redisClient = new Redis({
//   // this is the name of the cluster,  this is a required field
//   // this value is configured in the sentinel.conf files that each
//   // sentinel is started when the process is started.
//   name: process.env.REDIS_CLUSTER_NAME || 'redis01',
//   role: 'master',
//   host: redisHost,
//   port: redisPort,
//   sentinels: redisSentinels,
//
//   // https://github.com/luin/ioredis/issues/139#issuecomment-138275522
//   retryStrategy: (times) => {
//     if (times < 2) {
//       // retry connection timeouts after 500ms
//       winston.log('warn', `Error connecting to redis. Retried ${times} times`);
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
  port: 80,

  // datastores: {
  //   sql: {
  //     host: process.env.SQL_HOST,
  //     database: process.env.SQL_DATABASE,
  //     user: process.env.SQL_USER,
  //     password: process.env.SQL_PASSWORD,
  //     ssl: true,
  //   },
  //   readonlySql: {
  //     host: process.env.SQL_READONLY_HOST,
  //     database: process.env.SQL_READONLY_DATABASE,
  //     user: process.env.SQL_READONLY_USER,
  //     password: process.env.SQL_READONLY_PASSWORD,
  //     ssl: true,
  //   },
  // },
  //
  // cache: redisClient,

  librato: {
    email: process.env.LIBRATO_EMAIL,
    token: process.env.LIBRATO_TOKEN,
    prefix: 'production.',
  },

  log: {
    logger: new winston.Logger({
      level: 'info',
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          timestamp: true,
        }),
      ],
    }),
  },
};
