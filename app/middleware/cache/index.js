'use strict';

const logService = require('../../services/logService');

module.exports = () => {
  const store = {
    /**
     * Gets an item from cache
     * @param {string} key - Cache key
     * @returns {Object}
     */
    async get(key) {
      const data = await KoaConfig.cache.get(key);
      if (!data) {
        return data;
      }

      try {
        return JSON.parse(data);
      } catch (ex) {
        logService.error(ex);
        return data;
      }
    },
    /**
     * Sets the item in cache
     * @param {string} key - Cache key
     * @param {Object} value - Item to cache
     * @param {Number} [ttl] - Time to live (in seconds) for item to remain in cache
     * @returns {Promise.<void>}
     */
    async set(key, value, ttl) {
      let ttlSeconds;
      if (ttl) {
        ttlSeconds = Math.ceil(ttl / 1000);
      }

      const serializedValue = JSON.stringify(value);
      if (ttlSeconds) {
        await KoaConfig.cache.set(key, serializedValue, 'EX', ttlSeconds);
      } else {
        await KoaConfig.cache.set(key, serializedValue);
      }
    },
    /**
     * Removes an item from cache
     * @param {string} key - Cache key
     * @returns {Promise.<void>}
     */
    async destroy(key) {
      await KoaConfig.cache.del(key);
    },
    /**
     * Gets the value from cache. If the value does not exist in cache, the value will be retrieved from valueFunction and cached
     * @param {string} key - Cache key
     * @param {function} valueFunction - Function to get the value.
     * @param {Number} [ttl] - Time to live (in seconds) for item to remain in cache
     * @returns {Object}
     */
    async getOrSet(key, valueFunction, ttl) {
      let value = await store.get(key);

      if (value == null) {
        value = await valueFunction();

        if (value != null) {
          await store.set(key, value, ttl);
        }
      }

      return value;
    },
  };

  return async function cache(context, next) {
    context.cache = store;

    await next();
  };
};
