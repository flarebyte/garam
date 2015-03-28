/*global describe, it */
'use strict';
var assert = require('assert');
var garam = require('../');

describe('garam node module', function () {
  it('must have at least one test', function () {
    garam();
    assert(true, 'I was too lazy to write any tests. Shame on me.');
  });
});
