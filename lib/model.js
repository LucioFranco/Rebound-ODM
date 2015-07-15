function Model(connection,schema) {
  this.connection = connection;
  this.schema = schema;
}

Model.prototype.create = function create(opt,cb) {
  return this.connection.create(opt, cb);
}

module.exports = Model;
