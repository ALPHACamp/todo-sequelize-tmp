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
    before(async function() {
      // 在所有測試開始前會執行的程式碼區塊
      await db.User.destroy({where: {},truncate: true})
    });

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
      await db.User.destroy({where: {},truncate: true})
    });

    it("[O] 註冊帳號成功", (done) => {
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

    it("[X] 所有欄位都是必填", (done) => {
        request(app)
          .post('/users/register')
          .send()
          .end(function(err, res) {
            db.User.findOne({
              where: {
                email: 'email'
              }
            }).then((user) => {

              // 條件：檢查錯誤訊息
              expect(res.text).to.contain('所有欄位都是必填')
              done()
            })
        });
    });

    it("[X] 密碼輸入錯誤", (done) => {
        request(app)
          .post('/users/register')
          .send('name=name&email=email&password=password&password2=password2')
          .end(function(err, res) {
            db.User.findOne({
              where: {
                email: 'email'
              }
            }).then((user) => {

              // 條件：檢查錯誤訊息
              expect(res.text).to.contain('密碼輸入錯誤')
              done()
            })
        });
    });
})

describe('# login', () => {

       before(async function() {
        // 在所有測試開始前會執行的程式碼區塊
        await db.User.destroy({where: {},truncate: true})
      });

       after(async function() {
        // 在所有測試結束後會執行的程式碼區塊
        await db.User.destroy({where: {},truncate: true})
      });

       it("(O) 先註冊，再登入成功", (done) => {
          request(app)
            .post('/users/register')
            .send('name=name&email=email&password=password&password2=password')
            .expect(200)
            .end(function(err, res) {

              // 條件一：成功註冊
              db.User.findOne({
                where: {
                  email: 'email'
                }
              }).then((user) => {  
                expect(user.email).to.be.equal('email')

                request(app)
                  .post('/users/login')
                  .send('email=email&password=password')
                  .expect(200)
                  .end(function(err, res) {

                    // 條件二：登入成功
                    expect(res.statusCode).to.be.equal(302)
                    expect(res.text).to.be.equal('Found. Redirecting to /')
                    done()
                });
              })

          });
      });

  })