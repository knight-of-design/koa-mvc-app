'use strict';

/**
 * Compress static files
 * @param {object} grunt - Grunt instance
 */
module.exports = (grunt) => {

  grunt.config.set('compress', {
    css_brotli: {
      options: {
        mode: 'brotli',
      },
      files: [{
        expand: true,
        src: '.tmp/**/*.css',
        ext: '.css.br',
      }],
    },
    css_gzip: {
      options: {
        mode: 'gzip',
      },
      files: [{
        expand: true,
        src: '.tmp/**/*.css',
        ext: '.css.gz',
      }],
    },
    js_brotli: {
      options: {
        mode: 'brotli',
      },
      files: [{
        expand: true,
        src: '.tmp/**/*.js',
        ext: '.js.br',
      }],
    },
    js_gzip: {
      options: {
        mode: 'gzip',
      },
      files: [{
        expand: true,
        src: '.tmp/**/*.js',
        ext: '.js.gz',
      }],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-compress');
};
