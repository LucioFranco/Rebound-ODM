var Schema = require('../lib/schema');
var should = require('should');
var _      = require('lodash');
var util   = require('./testutil');
var faker  = require('faker');

describe("Schema: ", function () {
  describe('types',function(){
    it('should map schema types to Elasticsearch types',function(){
      Schema.types.String.should.eql('string');
      Schema.types[String].should.eql('string');
      Schema.types[Number].should.eql('integer');
      Schema.types[Date].should.eql('date');
    });
  });

  describe('getIndexMappingJSON', function() {
    it('should map a schema definition to a valid Elasticsearch Index Mapping', function(){
      var schema = new Schema({
        name: String,
        description: {type: String, index_analyzer: "type"},
        count: {type: 'number', analyzer: 'not_anaylzed'},
        max: Number,
        comments: [{
          type: Object,
          properties: {
            fieldWithObject: {
              properties: {
                deep: {
                  type: 'string',
                  analyzer: 'not_anaylzed'
                }
              }
            }
          }
        }],
        anotherField: Schema.types.String,
        fieldWithObject: {
          properties: {
            name: {
              type: 'string',
              analyzer: 'not_anaylzed'
            }
          }
        },
        anotherProperty: String
      });
      var map = schema.getIndexMappingJSON();
      map.should.be.ok;
      map.should.have.property('properties');
      _.each(map.properties, function (e, key) {
        if (_.isArray(e)) {
          e = e[0];
        }
        e.should.have.property('type');
        if (e.type === 'object') {
          e.properties.should.have.property('type')
        }

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
        name: faker.name.findName(),
        description: faker.lorem.sentences(),
        count: faker.random.number()
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
        name: faker.name.findName(),
        description: faker.lorem.sentences()
      });
      err.should.be.be.Array;
      err.length.should.eql(1);
    });
  });

  describe('apply schema', function() {
    var schema = new Schema({
      name: String,
      description: { type: String },
      count: { type: Number, default: 1 }
    });

    it('apply schema with correct doc', function() {
      var appliedSchema = schema.applySchema({
        name: faker.name.findName(),
        description: faker.lorem.sentences()
      });
      appliedSchema.should.have.properties(['name', 'description', 'count']);
      appliedSchema.count.should.be.eql(1);
    });

    it('apply schema with correct doc', function() {
      var appliedSchema = schema.applySchema({
        name: faker.name.findName(),
        description: faker.lorem.sentences(),
        count: faker.random.number(),
        blah: faker.lorem.words()
      });
      appliedSchema.should.have.properties(['name', 'description', 'count']);
      appliedSchema.should.not.have.property('dog');
    });

    it('apply schema should throw error', function() {
      util.shouldThrowError(function () {
        var appliedSchema = schema.applySchema({
          name: faker.nae.findName(),
          description: faker.lorem.sentences()
        });
      });
    });
  });
});
