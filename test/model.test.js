var Model  = require('../lib/model');
var Schema = require('../lib/schema');
var Rebound = require('../')
var es = require('elasticsearch');
var should = require('should');

describe('Model:', function () {
  describe('create model', function () {
    it('create model without Rebound Object', function () {
      var User = new Model(
        Rebound.connection,
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
      var User = Rebound.model('User', UserSchema);
      User.should.be.ok;
      User.should.have.properties(['connection', 'schema']);
      User.schema.should.be.instanceof(Schema);
      User.schema.should.eql(UserSchema);
    });
  });
});
