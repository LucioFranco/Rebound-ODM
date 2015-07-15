function ReboundModel(client,schema) {
  this.client = client;
  this.schema = schema;
}

ReboundSchema.prototype.create = function create(opt,cb) {
  return this.client.create(opt, cb);
}
