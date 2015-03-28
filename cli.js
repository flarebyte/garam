#!/usr/bin/env node
'use strict';
var meow = require('meow');
var garam = require('./');

var cli = meow({
  help: [
    'Usage',
    '  garam <input>',
    '',
    'Example',
    '  garam Unicorn'
  ].join('\n')
});

garam(cli.input[0]);
