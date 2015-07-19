'use strict';
var es     = require('elasticsearch');
var Model  = require('./model');
var Schema = require('./schema')
var _      = require('lodash');

function Rebound () {
  this.connection = es.Client();
  this.defaults = {
    index: 'default',
    type: 'default'
  }
  this.models = {};
}

/**
 * # Rebound API
 */

/**
 * Connects to a specific node
 * ### Example:
 *
 * 		Rebound.connect('localhost:9200');
 * 		// or
 * 		var options = {
 * 			defaults: {
 * 				index: 'Company',
 * 				type: 'ExampleType'
 * 			}
 * 			// any other elasticsearch options you want go here
 * 		};
 * 		Rebound.connect('localhost:9200', options);
 * @param  {string} host for elasticsearch
 * @param  {Object} Options for the elasticsearch clien
 */
Rebound.prototype.connect = function connect(host, opt) {
  if (opt) {
    if (opt.defaults) {
      this.defaults = opt.defaults;
    }
    this.connection = es.Client(_.merge({ host: host }, _.omit(opt, 'defaults')));
  }else {
    this.connection = es.Client({ host: host });
  }
}

/**
 * Create a Rebound Model with a cerntain index, type, and schema
 *
 * ### Examples:
 *
 *    	Rebound.modelIndex('Company', 'User', Schema);
 *
 * @param  {String} index  elasticsearch index
 * @param  {String} type   elasticsearch type
 * @param  {Schema} schema The Rebound Schema that maps to the specified index and type
 * @param  {Object} opt    Options for the Rebound Model
 * @return {Model}         The Rebound Model is returned
 */
Rebound.prototype.modelIndex = function modelIndex(index, type, schema, opt) {
  //if ()
  if(!(schema instanceof Schema)) return;
  opt = _.merge(
    {
      index: index,
      type: type
    }, opt);
  this.models = _.set(this.models, index + '.' + type, new Model(this.connection, this.defaults, opt,schema));
  return this.getModel(index, type);
}

/**
 * Create a Rebound Model with the default index and specifeied type
 *
 * ### Examples:
 *
 *    	Rebound.modelType('User', Schema);
 *
 * @param  {String} type   elasticsearch type
 * @param  {Schema} schema The Rebound Schema that maps to the specified index and type
 * @param  {Object} opt    Options for the Rebound Model
 * @return {Model}         The Rebound Model is returned
 */
Rebound.prototype.modelType = function (type, schema, opt) {

}

/**
 * Rebound Schema object
 *
 * ### Examples:
 * 	Rebound.Schema({
 *  		name: String,
 *    	description: { type: 'string', analyzer: 'not_analyzed' }
 *     });
 *
 * @param {Object} obj  schema
 * @param {Object} opts Optional options
 * @return {Schema}     New Rebound Schema is returned
 */
Rebound.prototype.Schema = function (obj, opts) {
  return new Schema(obj, opts);
};

/**
 * Gets specified model
 *
 * ### Examples:
 *
 *    	Rebound.getModel('Comapny', 'User');
 *
 * @param  {String} index Index for the model you want
 * @param  {String} type  Type for the Model you want
 * @return {Model}       The Rebound Model is returned
 */
Rebound.prototype.getModel = function _getModel(index, type) {
  return _.get(this.models, index + '.' + type);
}

/**
 * Ping the elasticsearch node
 * @param  {Number}   timeout
 * @param  {Function} callback
 * @return {Promise}           Optional promise
 */
Rebound.prototype.ping = function ping(timeout,cb) {
  return this.connection.ping({
    requestTimeout: timeout,
    hello: "rebound!"
  },cb);
}

var rebound = module.exports = exports = new Rebound;
