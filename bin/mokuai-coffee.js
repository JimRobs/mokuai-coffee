#!/usr/bin/env node

/*
 * mokuai-coffee
 * https://github.com/JimRobs/mokuai-coffee
 *
 * Copyright (c) 2015 JimRobs
 * Licensed under the MIT license.
 */
var fs = require('fs-extra');

var _ = require('lodash');
var program = require('commander');
var mokuaiCoffee = require('./../mokuai-coffee');

// Get utils
var log = require('./../utils/log');
var basename = require('./../utils/basename');
var repeatOption = require('./../utils/repeat-option');
var boolStringOption = require('./../utils/bool-string-option');

// cli declaration
program
    .version(mokuaiCoffee.version)
    .usage('<[modulename:]file ...> [options]')
    .description([
        'Wrap your CoffeeScript modules with mokuai.',
        'If the --output (-o) option is not used, the result is printed into the console.',
        'Modules are automatically named after file basenames (path/to/file.coffee => file).',
        'Files can also be prefixed by a custom module name and a colon (custom:path/to/file.js => custom).'
    ].join('\n  '))
    .option('-p, --prepend <value>', '(repeatable) add the <value> file to prepended files ' +
            '(files that are prepended to modules)', repeatOption, [])
    .option('-a, --append <value>', '(repeatable) add the <value> file to appended files ' +
            '(files that are appended to modules)', repeatOption, [])
    .option('-e, --exports [value]', 'define the exports mokuai-coffee option ' +
            '([value] is optional and can be either false, true, or any module name)', boolStringOption, false)
    .option('-n, --exportsname <value>', 'set the exportsname mokuai-coffee option to <value>', null)
    .option('-A, --autoexports', 'set the autoexports mokuai-coffee option to true')
    .option('-P, --partial', 'set the partial mokuai-coffee option to true (do not wrap to mokuai closure, ' +
            'i.e. do it manually with mokuai)')
    .option('-o, --output <output>', 'set the output file (if not set, print the result in the console)', null)
    .on('--help', function(){
        log('  Examples:');
        log('');
        log('    $ mokuai-coffee path/to/module.coffee customname:path/to/another/module.coffee');
        log('    $ mokuai-coffee <files> --output gen/app.js');
        log('    $ mokuai-coffee <files> --partial --output gen/app.js');
        log('    $ mokuai-coffee <files> --exports --output gen/app.js');
        log('    $ mokuai-coffee <files> --exports --exportsname MyApp --output gen/app.js');
        log('    $ mokuai-coffee <files> --exports AppModule --exportsname MyApp --output gen/app.js');
        log('    $ mokuai-coffee <files> --exports MainModule --exportsname MyApp --output gen/app.js');
        log('    $ mokuai-coffee <files> --append prepare.coffee --append launch.coffee --autoexports '+
            '--output gen/app.js');
        log('    $ mokuai-coffee <files> --prepend prepend.coffee --append append.coffee --exports ' +
            '--output gen/app.js');
    })
    .parse(process.argv);

// Init modules map
var modules = {};
// For each program argument, add the corresponding module to modules map
_.each(program.args, function(file){
    var name = null;
    // Split the arguments with colon
    var parts = file.split(':');
    // If there is more than one part, the first one is the module name, and the second one is the filepath
    if(parts.length > 1){
        name = parts[0];
        file = parts[1];
    }
    // If there is only one part, automatically define module name with file basename
    else {
        name = basename(file);
    }

    // If module name already exists, exit process (modules names must be unique)
    if(modules.hasOwnProperty(name)){
        log.error('Module name must be unique : found several "'+name+'"');
        process.exit(1);
    }

    modules[name] = file;
});

// Call mokuai from files with options
var result = mokuaiCoffee.fromFiles(modules, {
    prepend: program.prepend,
    append: program.append,
    exports: program.exports,
    exportsname: program.exportsname,
    autoexports: program.autoexports,
    partial: program.partial
});

// If the --output option is used, write the result to the corresponding file
var output = program.output;
if(output){
  fs.outputFileSync(output, result);
  log.info('File "'+output+'" created.');
}
// If it is not used, just print the result in the console
else {
    log(result);
}