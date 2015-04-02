#!/usr/bin/env node
'use strict';
var meow = require('meow');
var Sync = require('sync');
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

var about = function(value, callback) {
	garam.about(value,callback);
};
//garam(cli.input[0]);
Sync(function(){
    var result = about.sync(null);
    console.log(result); 
});


