const assert = require('assert')
const chai = require('chai')
const should = chai.should()

describe('Array', function() {
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