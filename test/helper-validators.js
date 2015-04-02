/*global describe, it */
'use strict';
var assert = require('chai').assert;
//var expect = require('chai').expect;
var validators = require('../helper/validators');

describe('validators', function () {
  it('must check if a project exist', function () {
    assert.isTrue(validators.isProject('blue'), "blue should be a project");
    assert.isFalse(validators.isProject('whatever'), "whatever should not be a project");
  });
  it('must check if schema exists', function () {
    assert.isFalse(validators.schemaExists('post','red','core'),"red core should not be a schema");
    assert.isTrue(validators.schemaExists('post','default','core'),"default core should be a schema");
    assert.isFalse(validators.schemaExists('post','red','whatever'), "whatever should not be a schema");
  });

  it('must get the best schema', function () {
    assert.equal(validators.getBestSchema('post','red','core'),'post.default.core',"core should be best schema");
    assert.isNull(validators.getBestSchema('post','red','whatever'), "whatever should not have best schema");
  });
  it('must validate a schema', function () {
    assert.isTrue(validators.validateSchema('post.default.core', {'Title': 'anytitle'}), "Title as string should be ok");
    assert.isFalse(validators.validateSchema('post.default.core', {'Title': 123}), "Title as integer should be wrong");
    assert.isTrue(validators.validateSchema('post.default.core', {'AnyOtherField': "any other"}), "Any other field should be ok");
   
  });
});
