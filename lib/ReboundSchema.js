var _ = require('lodash');

function ReboundSchema(schema,opts) {
  this.defs = schema;
}

ReboundSchema.prototype.getIndexMappingJSON = function() {
  return {
    properties: mapProperties(this.defs)
  }
}

function mapProperties(properties) {
  return _.mapValues(properties,function(value,key){
    if(_.includes(ReboundSchema.types, value)) {
      return { type: value };
    } else if( ReboundSchema.types[value] ) {
      if(key==='type') {
        return ReboundSchema.types[value];
      } else {
        return { type: ReboundSchema.types[value] };
      }
    } else if( _.isPlainObject(value) ) {
      return mapProperties(value);
    } else {
      return value;
    }
  });

}

ReboundSchema.types = {};
ReboundSchema.types.String = ReboundSchema.types[String] = 'string';
ReboundSchema.types.Date = ReboundSchema.types[Date] = 'date';
ReboundSchema.types.Boolean = ReboundSchema.types[Boolean] = 'boolean';
ReboundSchema.types.Number = ReboundSchema.types.Integer = ReboundSchema.types[Number] = ReboundSchema.types['number'] = 'integer';
ReboundSchema.types.Float = 'float';
ReboundSchema.types.Double = 'double';
ReboundSchema.types.Long = 'long';
ReboundSchema.types.Short = 'short';
ReboundSchema.types.Byte = 'byte';
ReboundSchema.types.Binary = 'binary';

module.exports = ReboundSchema
