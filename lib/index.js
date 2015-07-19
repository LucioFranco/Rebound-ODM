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
 * Connects to a specific node
 * @param  {string} host
 * @param  {Object} opt  Options for the elasticsearch clien
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

Rebound.prototype.modelIndex = function modelIndex(index, type, schema, opt) {
  //if ()
  if(!(schema instanceof Schema)) return;
  opt = _.merge(
    {
      index: index,
      type: type
    }, opt);
  this.models = _.set(this.models, index + '.' + type, new Model(this.connection, this.defaults, opt,schema));
  return this._getModel(index, type);
}

Rebound.prototype.model = function (type) {

}

Rebound.prototype._getModel = function _getModel(index, type) {
  return _.get(this.models, index + '.' + type);
}

Rebound.prototype.ping = function ping(timeout,cb) {
  return this.connection.ping({
    requestTimeout: timeout,
    hello: "rebound!"
  },cb);
}

var rebound = module.exports = exports = new Rebound;
