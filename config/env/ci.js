'use strict';

// const Redis = require('ioredis');
//
// const redisClient = new Redis({
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379,
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
  //
  // cache: redisClient,
};
