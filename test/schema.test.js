var Schema = require('../lib/schema');
var should = require('should');
var _      = require('lodash');

describe("Schema: ", function () {
  describe('types',function(){
    it('should map schema types to Elasticsearch types',function(){
      Schema.types.String.should.eql('string');
      Schema.types[String].should.eql('string');
    })
  })

  describe('getIndexMappingJSON', function() {
    it('should map a schema definition to a valid Elasticsearch Index Mapping', function(){
      var schema = new Schema({
        name: String,
        description: {type: String, index_analyzer:"type"},
        count: {type: 'number'},
        max: Number,
        anotherField: Schema.types.String,
        anotherProperty: String
      });
      var map = schema.getIndexMappingJSON();
      map.should.be.ok;
      map.should.have.property('properties');
      _.each(map.properties, function (e) {
        e.should.have.property('type');
      });
    });
  });

  describe('validate document', function() {
    it('should pass validation', function() {
      var schema = new Schema({
        name: String,
        description: { type: String },
        count: Number
      });
      var err = schema.validateDoc({
        name: 'Alex',
        description: 'His name is Alex',
        count: 3
      });
      err.should.be.Array;
      err.length.should.be.eql(0);
    });
    it('should pass validation', function() {
      var schema = new Schema({
        name: String,
        description: { type: String },
        count: Number
      });
      var err = schema.validateDoc({
        name: 'Alex',
        description: 'His name is Alex'
      });
      err.should.be.be.Array;
      err.length.should.eql(1);
    });
  });
  describe('apply schema', function() {
    it('apply schema with correct doc', function() {
      var schema = new Schema({
        name: String,
        description: { type: String },
        count: Number
      });
      var appliedSchema = schema.applySchema({
        name: 'Alex',
        description: 'Here is a desscription',
        count: 5
      });
      appliedSchema.should.have.properties(['name', 'description', 'count']);
    });
    it('apply schema with correct doc', function() {
      var schema = new Schema({
        name: String,
        description: { type: String },
        count: Number
      });
      var appliedSchema = schema.applySchema({
        name: 'Alex',
        description: 'Here is a desscription',
        count: 5,
        dog: 'five'
      });
      appliedSchema.should.have.properties(['name', 'description', 'count']);
      appliedSchema.should.not.have.property('dog');
    });
  });
});
