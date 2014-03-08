'use strict';
var es = require('elasticsearch');

/**
 * Rebound constructor.
 */

function Rebound () {
  this.connection = es.Client();
}

Rebound.prototype.ping = function ping(timeout,cb) {
  return this.connection.ping({
    requestTimeout: timeout,
    hello: "rebound!"
  },cb);
}

var rebound = module.exports = exports = new Rebound;