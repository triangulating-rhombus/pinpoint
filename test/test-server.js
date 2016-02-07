var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server');
var should = chai.should();

chai.use(chaiHttp);

describe('Test server end points', function() {
  it('should be able to sign up', function(done) {
    chai.request(server)
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send({"username": "testtest1", "password": "12345"})
      .end(function(err, res){
        console.log(res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });

  it('should be able to sign up', function(done) {
    chai.request(server)
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send({"username": "testtest2", "password": "12345"})
      .end(function(err, res){
        console.log(res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });

  it('should be able to get settings', function(done) {
    chai.request(server)
      .get('/settings')
      .set('Content-Type', 'application/json')
      .set('x-access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IndheW5lIg.66Qxc0MBJv_cJyvP8WfiEUCZZ4X1BXBSghVQVuAgBTA')
      .end(function(err, res){
        console.log(res.body);
        done();
      });
  });

});