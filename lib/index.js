'use strict';
var es     = require('elasticsearch');
var Model  = require('./model');
var Schema = require('./schema')
var _      = require('lodash');

/**
 * Rebound constructor.
 */

function Rebound () {
  this.connection = es.Client();
  this.defaults = {
    index: 'default',
    type: 'default'
  }
  this.models = {};
}

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

Rebound.prototype.model = function model(index, modelName, schema) {
  if(!(schema instanceof Schema)) return;
  var opt = {
    index: index,
    type: modelName
  };
  this.models[modelName] = new Model(this.connection, opt,schema);
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
