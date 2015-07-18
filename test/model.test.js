var Model   = require('../lib/model');
var Schema  = require('../lib/schema');
var Rebound = require('../')
var es      = require('elasticsearch');
var should  = require('should');
var util    = require('./testutil');
var faker   = require('faker');

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

  describe('Model CRUD', function() {
    var TestSchema = new Schema({
      name: String,
      count: Number
    });
    var TestModel = new Model(Rebound.connection, {index: 'test', type: 'text'}, TestSchema);

    describe('model create', function() {
      it('create document with doc', function() {
        return TestModel
          .create({
            name: faker.name.findName(),
            count: faker.random.number()
          })
          .then(function (result) {
            result.should.be.ok;
            result.created.should.be.true;
          });
      });
      it('create document with doc', function() {
        util.shouldThrowError(function () {
          TestModel.create({ name: faker.name.findName() });
        });
      });
    });
    describe('model delete', function() {
      it('delete created document', function() {
        return TestModel
          .create({
            name: faker.name.findName(),
            count: faker.random.number()
          })
          .then(function (result) {
            return TestModel.delete(result._id);
          })
          .then(function (result) {
            result.should.be.ok;
            result.found.should.be.true;
            result._version.should.be.eql(2);
          });
      });
    });
  });

  after(function () {
    return es.Client().indices.delete({index: 'test'});
  });
});
