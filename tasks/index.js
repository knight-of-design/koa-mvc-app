'use strict';

const clean = require('./configs/clean');
const compress = require('./configs/compress');
const eslint = require('./configs/eslint');
const jsbeautifier = require('./configs/jsbeautifier');
const sass = require('./configs/sass');
const sync = require('./configs/sync');
const watch = require('./configs/watch');
const taskDefault = require('./default');
const taskLint = require('./lint');
const taskBeautify = require('./beautify');

module.exports = (grunt) => {
  // Register configs
  clean(grunt);
  compress(grunt);
  eslint(grunt);
  jsbeautifier(grunt);
  sass(grunt);
  sync(grunt);
  watch(grunt);

  // Register tasks
  taskDefault(grunt);
  taskLint(grunt);
  taskBeautify(grunt);
};
