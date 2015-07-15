var Schema = require('../lib/schema');
var should = require('should');

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
      //console.log(map);
      map.should.be.ok;
    });
  });
});
