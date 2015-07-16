function Model(connection, opt,schema) {
  this.index = opt.index;
  this.type = opt.type;
  this.connection = connection;
  this.schema = schema;
}

Model.prototype.create = function create(doc,cb) {
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

module.exports = Model;
