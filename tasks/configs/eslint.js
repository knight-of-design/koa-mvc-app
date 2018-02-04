'use strict';

/**
 * Lints the javascript source code
 * @param {object} grunt - Grunt instance
 */
module.exports = (grunt) => {

  grunt.config.set('eslint', {
    default: {
      files: [{
        expand: true,
        cwd: './',
        src: ['app/**/*.js', 'tasks/**/*.js', 'test/**/*.js', 'assets/js/**/*.js', '!assets/js/{libs,dependencies}/**/*.js', 'config/**/*.js'],
      }],
      options: {
        cache: true,
        fix: true,
      },
    },
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-staged2');
};
