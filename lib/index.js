'use strict';
var es = require('elasticsearch');
var Model = require('./model');
var Schema = require('./schema')

/**
 * Rebound constructor.
 */

function Rebound () {
  this.connection = es.Client();
  this.models = {};
}

Rebound.prototype.connect = function connect(opt) {
  if(typeof opt === 'string')
    opt = { host: opt };
  this.connection = es.Client(opt);
}

Rebound.prototype.model = function model(modelName, schema) {
  if(!(schema instanceof Schema)) return;
  this.models[modelName] = new Model(this.connection, schema);
  return this._getModel(modelName);
}

Rebound.prototype._getModel = function _getModel(name) {
  return this.models[name];
}

Rebound.prototype.ping = function ping(timeout,cb) {
  return this.connection.ping({
    requestTimeout: timeout,
    hello: "rebound!"
  },cb);
}

var rebound = module.exports = exports = new Rebound;
