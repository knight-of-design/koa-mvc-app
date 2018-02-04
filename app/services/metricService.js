'use strict';

const librato = require('librato-node');
const logService = require('./logService');

module.exports = {
  /**
   * Tracks counts in Librato. Increments the value of a metric over time
   * @param {string} name - Name of metric to increment
   * @param {Number} [count] - Value to increment metric by
   * @param {Object} [options] - Options
   * @param {string} [options.source] - Secondary identifying dimension in addition to ‘name’ for a metric.
   */
  increment(name, count, options) {
    try {
      librato.increment(name, count, options);
    } catch (ex) {
      logService.warn(ex);
    }
  },

  /**
   * Tracks gauges in Librato. Used to capture arbitrary measurements at one point in time.
   * @param {string} name - Name of metric to track
   * @param {Number} [value] - Measurement value
   * @param {Object} [options] - Options
   * @param {string} [options.source] - Secondary identifying dimension in addition to ‘name’ for a metric.
   */
  measure(name, value, options) {
    try {
      librato.measure(name, value, options);
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        logService.info(`${name}:\t${value}`);
      }
    } catch (ex) {
      logService.warn(ex);
    }
  },
  /**
   * Record a timing metric based on the specified startTime and now
   * @param {string} name
   * @param {time} startTime - Start time, as returned from process.hrtime()
   */
  duration: function duration(name, startTime) {
    const time = this.getMilliseconds(startTime);
    this.measure(name, time);
  },

  /**
   * Calculate time in milliseconds since a given datetime
   * @param {time} startTime - Time, as returned from process.hrtime()
   * @returns {Number} Milliseconds since startTime
   */
  getMilliseconds(startTime) {
    const diff = process.hrtime(startTime);
    return parseFloat(((diff[0] * 1e3) + (diff[1] * 1e-6)).toFixed(3));
  },
};
