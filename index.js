'use strict';
var request = require('request');

var garamUrl = function(path) {
    return "http://localhost:3000/" + path;
};

var document = function(project, schema, id, json, callback) {
    request(garamUrl(["info", "project", "schema"].join("/")), function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
            callback(null, "ok");
        } else {
            console.log(error);
            callback(error);
        }
    });
};

var info = function(project, schema, id, callback) {
    request(garamUrl(["info", "project", "schema"].join("/")), function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
            callback(null, "ok");
        } else {
            console.log(error);
            callback(error);
        }
    });
};

var about = function(callback) {
    request(garamUrl("about"), function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
            callback(null, "ok");
        } else {
            console.log(error);
            callback(error);
        }
    });
};

module.exports.info = info;
module.exports.document = document;
module.exports.about = about;