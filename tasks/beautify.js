'use strict';

/**
 * Beautifies the javascript source code
 * @param {Object} grunt - Grunt instance
 */
module.exports = (grunt) => {
  grunt.registerTask('beautify', [
    'jsbeautifier:default',
  ]);

  // Limit beautify task to staged git files
  grunt.registerTask('quickbeautify', [
    'staged:jsbeautifier:default',
  ]);
};
