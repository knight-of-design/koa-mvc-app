'use strict';

/**
 * Lints the javascript source code
 * @param {Object} grunt - Grunt instance
 */
module.exports = (grunt) => {
  grunt.registerTask('lint', [
    'eslint:default',
  ]);

  // Limit lint task to staged git files
  grunt.registerTask('quicklint', [
    'staged:eslint:default',
  ]);
};
