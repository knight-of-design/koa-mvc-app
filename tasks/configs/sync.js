'use strict';

/**
 * Synchronize files from the `assets` folder to `.tmp/public`,
 * smashing anything that's already there.
 *
 * For usage docs see:
 *    https://github.com/tomusdrw/grunt-sync
 *
 * @param {object} grunt - Grunt instance
 */
module.exports = (grunt) => {

  grunt.config.set('sync', {
    default: {
      files: [{
        cwd: './assets',
        src: ['**/!(_)*.!(coffee|less|sass|scss)'],
        dest: '.tmp',
      }],
    },
  });

  grunt.loadNpmTasks('grunt-sync');
};
