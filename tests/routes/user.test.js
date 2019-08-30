const chai = require('chai')
const { expect } = require('chai')
const request = require('supertest')

const app = require('../../app')
const db = require('../../models')

describe('# signup', function() {
    it("GET /users/register", (done) => {
        request(app)
          .get('/users/register')
          .end(function(err, res) {
            expect(res.statusCode).to.be.equal(200) 
            expect(res.text).to.contain('Register') 
            done()
        });
    });
})

describe('# signup', function() {
    it("should create user", (done) => {
        request(app)
          .post('/users/register')
          .send('name=name&email=email&password=password&password2=password')
          .end(function(err, res) {
            db.User.findOne({
              where: {
                email: 'email'
              }
            }).then((user) => {  
              expect(user.email).to.be.equal('email')
              done()
            })
        });
    });
})