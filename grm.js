#!/usr/bin/env node

'use strict';
var Sync = require('sync');
var garam = require('./');
var cli = require('cli');

cli.parse({
    about: ['a', 'About the garam service'],
    escape: ['e', 'Enable interpretation of backslash escapes'],
    separator: ['s', 'Separate arguments using this value', 'string', ' '],
    output: [false, 'Write to FILE rather than the console', 'file']
});

var about = function(value, callback) {
    garam.about(value, callback);
};

cli.main(function(args, options) {
    var output = '';
    var output_stream;
    if (options.about) {
        Sync(function() {
            output = about.sync(null);
        });
    }

    try {
        if (options.output) {
            output_stream = this.native.fs.createWriteStream(options.output);
        } else {
            output_stream = process.stdout;
        }
        output_stream.write(output);
    } catch (e) {
        this.fatal('Could not write to output stream');
    }
});