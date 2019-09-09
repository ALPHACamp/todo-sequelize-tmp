const sinon = require('sinon')
const chai = require('chai')
const { expect } = require('chai')
const request = require('supertest')

const app = require('../../app')
const db = require('../../models')
const helpers = require('../../config/_helpers')

describe('# todo', function() {

     it("[X] 未登入狀態 GET /todos/new", (done) => {
        request(app)
          .get('/todos/new')
          .end(function(err, res) {
            expect(res.statusCode).to.be.equal(302) 
            done()
        });
    });
})


describe('# todo', function() {

    before(async function() {
        // 在所有測試開始前會執行的程式碼區塊
        await db.User.destroy({where: {},truncate: true})
        const rootUser = await db.User.create({name: 'root'})

        this.authenticate = sinon.stub(helpers, "isAuthenticated").returns(true)

    });

    after(async function() {
        // 在所有測試結束後會執行的程式碼區塊
        await db.User.destroy({where: {},truncate: true})
        this.authenticate.restore();
    });

   it("[O] 登入狀態 GET /todos/new", (done) => {
        request(app)
          .get('/todos/new')
          .end(function(err, res) {
            expect(res.statusCode).to.be.equal(200) 
            done()
        });
    });
})
