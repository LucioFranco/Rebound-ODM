var Rebound = require(__dirname + '/../index');
var should = require('should');

describe("rebound module: ", function () {
  describe('default connection works', function() {
    it('without options - promise', function(done){
      Rebound.ping(1000).then(function(res){
        res.should.be.ok;
        done();
      },function(err){
        done(err);
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
});