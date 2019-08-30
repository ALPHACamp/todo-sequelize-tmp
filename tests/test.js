const assert = require('assert')
const chai = require('chai')
const should = chai.should()
const { expect } = require('chai')

const app = require('../app')
const db = require('../models')

describe('Array', function() {
  before(function() {
    // 在所有測試開始前會執行的程式碼區塊
    console.log(' ===== before ===== ')
  });

   after(function() {
    // 在所有測試結束後會執行的程式碼區塊
    console.log(' ===== after ===== ') 
  });

   beforeEach(function() {
    // 在每個 Test Case 開始前執行的程式碼區塊
    console.log(' == beforeEach == ')
  });

   afterEach(function() {
    // 在每個 Test Case 結束後執行的程式碼區塊
    console.log(' == afterEach == ')
  });

  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {

      const data = [1, 2, 3].indexOf(4)

      // 比較斷言庫的不同
      assert.equal(data, -1)
      chai.assert.equal(data, -1)
      chai.expect(data).to.equal(-1)
      data.should.equal(-1)
    });
  });
});

describe('# User Model', () => {

   describe('CRUD', () => {

     let data = null

     it('create', (done) => {
      db.User.create({}).then((user) => {   
        data = user
        done()
      })
    })
    it('read', (done) => {
        db.User.findByPk(data.id).then((user) => {  
          expect(data.id).to.be.equal(user.id)
          done()
        })
    })
    it('update', (done) => {
      db.User.update({}, { where: { id: data.id }}).then(() => {
        db.User.findByPk(data.id).then((user) => { 
          expect(data.updatedAt).to.be.not.equal(user.updatedAt) 
          done()
        })
      })
    })
    it('delete', (done) => {
      db.User.destroy({ where: { id: data.id }}).then(() => {
        db.User.findByPk(data.id).then((user) => { 
          expect(user).to.be.equal(null) 
          done()
        })
      })
    })
  })
})