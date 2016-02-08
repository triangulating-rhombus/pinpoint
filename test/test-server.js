var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server');
var should = chai.should();
var db = require('../server/db/dbModel');

chai.use(chaiHttp);

var token = "";



describe('Test server end points', function() {

  before(function (done) {
      chai.request(server)
        .post('/signup')
        .set('Content-Type', 'application/json')
        .send({"username": "testUser2", "password": "12345"})
        .end(function(err, res){
          token = res.body.token;
          done();
        });
  })


  it('should be able to sign up', function(done) {
    chai.request(server)
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send({"username": "testUser1", "password": "12345"})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });

  it('should throw error when creating account with existing username', function(done) {
    chai.request(server)
      .post('/signup')
      .set('Content-Type', 'application/json')
      .send({"username": "testUser2", "password": "12345"})
      .end(function(err, res){
         res.should.have.status(401);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.have.property('error');
         res.body.error.should.equal('user already exists!');
         done();
       });
  });

  it('should be able to set settings', function(done) {
    chai.request(server)
      .post('/settings')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .send({"tag1": "hiking", "tag2": "sleep", "tag3": "shopping", "isBroadcasting": true})
      .end(function(err, res){
         res.should.have.status(201);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.have.property('success');
         res.body.success.should.equal('Updated tags: hiking, sleep, shopping');
         done();
      });
  });

  it('should be able to get settings', function(done) {
    chai.request(server)
      .get('/settings')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .end(function(err, res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.have.property('tag1');
         res.body.isBroadcasting.should.equal(true);
         done();
      });
  });


    after(function(done) {

      db.Users.destroy({where: {"username": "testUser1"}});
      db.Users.destroy({where: {"username": "testUser2"}});
      done();

    });

});