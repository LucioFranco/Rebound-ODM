var search = require('./search');
var _      = require('lodash');

var modelOptions = {};

function Model(connection, opt,schema) {
  this.index = opt.index;
  this.type = opt.type;
  this.connection = connection;
  this.schema = schema;
  // TODO after the props have been set it should check to see if the index exists
  // if the index does not exists then it should create the index mapping
  // based off of the schema mappings
  // There should also be strict mapping vs non strict
}

Model.prototype.create = function (doc,cb) {
  var err = this.schema.validateDoc(doc);
  if (err.length > 0) {
    throw new Error(err.join('\n'));
  }else {
    var opt = {
      index: this.index,
      type: this.type,
      body: this.schema.applySchema(doc)
    }
    return this.connection.create(opt, cb);
  }
}

Model.prototype.delete = function (id, opt,cb) {
  if (!opt) opt = {};
  return this
    .connection
    .delete(_.merge(
      {
        index: this.index,
        type: this.type,
        id: id
      }, opt),
      cb
    );
}

Model.prototype.deleteByQuery = function (body, opt, cb) {
  if (!opt) opt = {};
  return this
    .connection
    .deleteByQuery(_.merge(
      {
        index: this.index,
        type: this.type,
        body: body
      }, opt),
      cb
    );
}

Model.prototype.search = search;

module.exports = Model;
