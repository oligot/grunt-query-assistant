/*
* grunt-query-assistant
* https://github.com/oli/grunt-query-assistant
*
* Copyright (c) 2013 Olivier Ligot
* Licensed under the MIT license.
*/

'use strict';

var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('query_assistant', 'Launch the query assistant', function(className) {
    var options = this.options({
      xml_parser: '-eiffel',
      input_dir: '.',
      output_dir: '.',
      parent_cursor: 'ECLI_CURSOR',
      no_prototype: '',
      parent_modify: 'ECLI_QUERY'
    });
    if (className) {
      var files = [className.toLowerCase() + '.xml'];
    } else {
      var files = fs.readdirSync(options.input_dir).filter(function(file) {
        return path.extname(file) == '.xml';
      });
    }
    files.forEach(function(input) {
      var access_routines_prefix = input.replace(path.extname(input), '');
      var command = 'query_assistant ' + options.xml_parser + ' -input ' + path.join(options.input_dir, input) + ' -output_dir ' + options.output_dir + ' -dsn ' + options.dsn + ' -user ' + options.user + ' -pwd ' + options.pwd + ' -schema ' + options.schema + ' -force_string -parent_cursor ' + options.parent_cursor + ' -parent_modify ' + options.parent_modify + ' -access_routines_prefix ' + access_routines_prefix + ' ' + options.no_prototype;
      grunt.verbose.writeln('Launching ' + command + '...');
      shell.exec(command);
    });
  });
};
