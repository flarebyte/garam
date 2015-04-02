var fs = require('fs');
var _ = require('lodash');
var S = require('string');
var schemaValidator = require('is-my-json-valid/require');
var config = require('config');
var projects = config.get('Projects');
var directories = config.get('Directories');

var projectDir = S(__dirname).chompRight('helper').s;

var dropJsonSuffix = function(name) {
    return S(name).chompRight('.json').s;
};

var createValidator = function(name) {
    return schemaValidator("../" + directories.schema + name + '.json');
};

var createGreedyValidator = function(name) {
    return schemaValidator("../" + directories.schema + name + '.json', {
        greedy: true
    });
};

var schemaFiles = fs.readdirSync(projectDir + directories.schema);
var schemaNames = _.map(schemaFiles, dropJsonSuffix);


var schemaValidators = {};
_(schemaNames).forEach(function(name) {
    schemaValidators[name] = createValidator(name);
}).value();

var greedySchemaValidators = {};
_(schemaNames).forEach(function(name) {
    schemaValidators[name] = createGreedyValidator(name);
}).value();

var asSchemaName = function(action, project, name) {
    return action + '.' + project + '.' + name;
};

var isProject = function(name) {
    return _.has(projects, name);
};

var schemaExists = function(action, project, name) {
    var schema = asSchemaName(action, project, name);
    return _.includes(schemaNames, schema);
};

var getBestSchema = function(action, project, name) {
    var isPerfectSchema = schemaExists(action, project, name);
    var isDefaultSchema = schemaExists(action, 'default', name);
    if (isPerfectSchema) {
        return asSchemaName(action, project, name);
    } else if (isDefaultSchema) {
    	return asSchemaName(action, 'default', name);
    } else {
    	return null;
    }

};

var validateSchema = function(schema, json) {
    var v = schemaValidators[schema];
    return v(json);

};

var getSchemaErrors = function(schema, json) {
    var v = greedySchemaValidators[schema];
    v(json);
    return v.errors;
};

module.exports = {
    "isProject": isProject,
    "getBestSchema": getBestSchema,
    "schemaExists": schemaExists,
    "validateSchema": validateSchema,
    "getSchemaErrors": getSchemaErrors,
};