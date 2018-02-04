'use strict';

/**
 * Clean files and folders.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-clean
 * @param {object} grunt - Grunt instance
 */
module.exports = (grunt) => {

  grunt.config.set('clean', {
    default: ['.tmp/**'],
    node_modules: ['node_modules/*', '!node_modules/npm', '!node_modules/grunt-cli', '!node_modules/grunt-npm-install'],
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
