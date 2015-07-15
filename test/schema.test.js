var ReboundSchema = require(__dirname + '/../lib/schema');
var should = require('should');

describe("rebound schema: ", function () {
  describe('types',function(){
    it('should map schema types to Elasticsearch types',function(){
      ReboundSchema.types.String.should.eql('string');
      ReboundSchema.types[String].should.eql('string');
    })
  })

  describe('getIndexMappingJSON', function() {
    it('should map a schema definition to a valid Elasticsearch Index Mapping', function(){
      var schema = new ReboundSchema({
        name: String,
        description: {type: String, index_analyzer:"type"},
        count: {type: 'number'},
        max: Number,
        anotherField: ReboundSchema.types.String,
        anotherProperty: String
      });
      var map = schema.getIndexMappingJSON();
      //console.log(map);
      map.should.be.ok;
    });
  });
});
