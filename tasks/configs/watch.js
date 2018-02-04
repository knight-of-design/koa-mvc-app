'use strict';

/**
 * Watch for changes of files in the `assets` folder and run tasks
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-watch
 *
 * @param {object} grunt - Grunt instance
 */
module.exports = (grunt) => {

  grunt.config.set('watch', {
    options: {
      // increase watch interval to reduce CPU usage
      // https://github.com/gruntjs/grunt-contrib-watch/issues/429
      interval: 300,
    },
    assets: {
      // Assets to watch:
      files: ['assets/**/*'],

      // When assets are changed:
      tasks: ['sass:default', 'sync:default'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
