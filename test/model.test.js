var Model  = require('../lib/model');
var Schema = require('../lib/schema');
var Rebound = require('../')
var es = require('elasticsearch');
var should = require('should');

describe('Model:', function () {
  describe('create model', function () {
    it('create model without Rebound Object', function () {
      var User = new Model(
        Rebound.connection,{},
        new Schema({
          username: String,
          password: String,
          age: Number
      }));
      User.should.be.ok;
      User.should.have.properties(['connection', 'schema']);
      User.schema.should.be.instanceof(Schema);
    });
    it('create model with Rebound Object', function () {
      var UserSchema = new Schema({
        username: String,
        password: String,
        age: Number
      });
      var User = Rebound.model('User', {},UserSchema);
      User.should.be.ok;
      User.should.have.properties(['connection', 'schema']);
      User.schema.should.be.instanceof(Schema);
      User.schema.should.eql(UserSchema);
    });
  });
  describe('model create', function() {
    it('create document with doc', function() {
      var TestSchema = new Schema({
        name: String,
        count: Number
      });
      var TestModel = new Model(Rebound.connection, {index: 'test', type: 'text'}, TestSchema);
      return TestModel
        .create({
          name: 'USA',
          count: 10
        })
        .then(function (result) {
          result.should.be.ok;
          result.created.should.be.true;
        });
    });
  });
  after(function () {
    return es.Client().indices.flush({index: 'test'});
  });
});
