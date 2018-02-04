'use strict';

module.exports = {

  /**
   * Cache key prefix for session data
   */
  cacheKeyPrefix: '__session:',

  /**
   * Session cookie name
   */
  cookieName: '__sid',

  /**
   * Options to use when creating the session cookie
   */
  cookieOptions: {
    maxAge: 0,
    path: '/',
    httpOnly: true,
    overwrite: true,
    signed: false,
  },

  /**
   * Specifies how long (in seconds) to store session data in the session store
   */
  ttl: 24 * 60 * 60, // 24 hours
};
