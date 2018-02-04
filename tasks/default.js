'use strict';

/**
 * Default grunt task (typically for development)
 * @param {Object} grunt - Grunt instance
 */
module.exports = (grunt) => {
  grunt.registerTask('default', [
    'clean:default',
    'sass:default',
    'sync:default',
    'compress',
    'watch:assets',
  ]);
};
