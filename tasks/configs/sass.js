'use strict';

/**
 * Compiles sass/scss files into CSS.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-sass
 * @param {object} grunt - Grunt instance
 */
module.exports = (grunt) => {
  grunt.config.set('sass', {
    default: {
      options: {
        sourceMap: true,
      },
      files: [{
        expand: true,
        cwd: 'assets/styles/',
        src: ['**/*.scss'],
        dest: '.tmp/styles/',
        ext: '.css',
      }],
    },
  });

  grunt.loadNpmTasks('grunt-sass');
};
