var config = require('config');
var directories = config.get('Directories');
var projects = config.get('Projects');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var Datastore = require('nedb');

/* Ensure we have a working folder for database*/
mkdirp.sync(directories.infodb);

var databases = {};

 _.forOwn(projects, function(value, key) {
   databases[key] = new Datastore({ filename: directories.infodb+'db-'+key, autoload: true });
});

module.exports.db = databases;
