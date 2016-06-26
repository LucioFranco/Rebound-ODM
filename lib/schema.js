var _ = require('lodash');

function Schema(schema,opts) {
  this.defs = schema;
}

/**
 *	# Schema
 */

/**
 * Get the elasticsearch index mapping for the Schema
 * @return {Object} Returns the elasticsearch mapping for the schema
 */
Schema.prototype.getIndexMappingJSON = function() {
  return {
    properties: mapProperties(this.defs)
  }
}

/**
 * Validate a doc vs the schema
 * @param  {Object} doc that you want to validate
 * @return {Array}     Returns an array of errors
 */
Schema.prototype.validateDoc = validateDoc = function (doc) {
  var errors = [];
  _.each(this.defs, function (e, key) {
    if (!_.has(doc, key))
      if (!_.has(e, 'default'))
        errors.push('Schema violation missing property ' + key + ' from schema.');
  });
  return errors;
}

/**
 * Applies the Schema to the doc. It will clean up the doc if it needs to.
 * @param  {Object} doc that will be applied
 * @return {Object}     Returns the applied Schema object
 */
Schema.prototype.applySchema = function (doc) {
  return _.mapValues(this.defs, function (e, key) {
    var value = doc[key];
    if (value)
      return value;
    else if (_.has(e, 'default'))
      return e.default;
    else
      throw new Error('Schema violation missing property ' + key + ' from schema.');
  });
}

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
