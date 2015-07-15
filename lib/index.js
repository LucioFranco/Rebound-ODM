'use strict';
var es = require('elasticsearch');

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
  if(typeof shcema !== 'ReboundSchema') return; // Should throw an error
  return
}

Rebound.prototype.ping = function ping(timeout,cb) {
  return this.connection.ping({
    requestTimeout: timeout,
    hello: "rebound!"
  },cb);
}

var rebound = module.exports = exports = new Rebound;
