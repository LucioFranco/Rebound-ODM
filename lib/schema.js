var _ = require('lodash');

function Schema(schema,opts) {
  this.defs = schema;
}

Schema.prototype.getIndexMappingJSON = function() {
  return {
    properties: mapProperties(this.defs)
  }
}

Schema.prototype.validateDoc = validateDoc = function (doc) {
  var errors = [];
  _.each(this.defs, function (e, key) {
    if (!_.has(doc, key))
      errors.push('Schema violation missing property ' + key + ' from schema.');
  });
  return errors;
}

Schema.prototype.applySchema = function (doc) {
  return _.mapValues(this.defs, function (e, key) {
    var value = doc[key];
    if (value)
      return value;
    else
      throw new Error('Schema violation missing property ' + key + ' from schema.');
  });
}

/*
function checkTypes(doc) {
  // TODO need to figure out proper way to do this
  var defs = mapProperties(this.defs);
  _.forIn(doc, function (value, key) {
      var temp = defs.properties[key].type;
  });
}
*/

function mapProperties(properties) {
  // TODO: find a way to get deep embeded objects to have type of object
  return _.mapValues(properties,function(value,key){
    if(_.includes(Schema.types, value)) {
      return { type: value };
    } else if( Schema.types[value] ) {
      if(key ==='type') {
        return Schema.types[value];
      } else {
        return { type: Schema.types[value] };
      }
    } else if( _.isPlainObject(value) ) {
      return _.merge({ type: 'object' }, mapProperties(value));
    } else {
      return value;
    }
  });
}

Schema.types = {};
Schema.types.Object = Schema.types[Object] = 'object';
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
