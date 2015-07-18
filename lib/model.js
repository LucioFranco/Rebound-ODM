var _ = require('lodash');

function Model(connection, opt,schema) {
  this.index = opt.index;
  this.type = opt.type;
  this.connection = connection;
  this.schema = schema;
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

module.exports = Model;
