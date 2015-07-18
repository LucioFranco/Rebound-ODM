var Rebound = require(__dirname + '/../index');
var should = require('should');

describe("Rebound module: ", function () {
  describe('default connection works', function() {
    it('without options - promise', function(){
      return Rebound.ping(1000).then(function(res){
        res.should.be.ok;
      });
    });
    it('without options - callback', function(done){
      Rebound.ping(1000,function(err,res){
        if(err) done(err);
        res.should.be.ok;
        done();
      });
    });
  });
  describe('custom connection configuration', function() {
    it('with options', function() {
      Rebound.connect('localhost:9200', {
        defaults: {
          index: 'test',
          type: 'test'
        }
      });
      return Rebound
        .ping(1000)
        .then(function (res) {
          res.should.be.ok
        });
    });
    it('with string for host', function() {
      Rebound.connect('localhost:9200');
      return Rebound
        .ping(1000)
        .then(function (res) {
          res.should.be.ok
        });
    });
  });
});
