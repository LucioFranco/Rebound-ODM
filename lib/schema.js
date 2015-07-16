var _ = require('lodash');

function Schema(schema,opts) {
  this.defs = schema;
}

Schema.prototype.getIndexMappingJSON = function() {
  return {
    properties: mapProperties(this.defs)
  }
}

Schema.prototype.validateDoc = function (doc) {

}

function mapProperties(properties) {
  return _.mapValues(properties,function(value,key){
    if(_.includes(Schema.types, value)) {
      return { type: value };
    } else if( Schema.types[value] ) {
      if(key==='type') {
        return Schema.types[value];
      } else {
        return { type: Schema.types[value] };
      }
    } else if( _.isPlainObject(value) ) {
      return mapProperties(value);
    } else {
      return value;
    }
  });

}

Schema.types = {};
Schema.types.String = Schema.types[String] = 'string';
Schema.types.Date = Schema.types[Date] = 'date';
Schema.types.Boolean = Schema.types[Boolean] = 'boolean';
Schema.types.Number = Schema.types.Integer = Schema.types[Number] = Schema.types['number'] = 'integer';
Schema.types.Float = 'float';
Schema.types.Double = 'double';
Schema.types.Long = 'long';
Schema.types.Short = 'short';
Schema.types.Byte = 'byte';
Schema.types.Binary = 'binary';

module.exports = Schema
