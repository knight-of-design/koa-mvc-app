'use strict';

/**
 * Beautifies the javascript source code
 * @param {object} grunt - Grunt instance
 */
module.exports = (grunt) => {

  grunt.config.set('jsbeautifier', {
    default: {
      files: [{
        expand: true,
        cwd: './',
        src: ['app/**/*.js', 'tasks/**/*.js', 'test/**/*.js', 'assets/js/**/*.js', '!assets/js/{libs,dependencies}/**/*.js', 'config/**/*.js'],
      }],
      options: {
        config: '.jsbeautifyrc',
      },
    },
    file: {
      src: grunt.option('target'),
      options: {
        config: '.jsbeautifyrc',
      },
    },
  });

  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-staged2');
};
