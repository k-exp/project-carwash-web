var common = require('jsCommon');
var assert = require('assert');
var dat = require('./data');


describe('test.data.job', function () {
  it(
    'should produce 100 test records',
    function () {
      assert.equal(dat.job.length, 100);
    }
  );
});


describe('crypto: uuid', function () {
  it(
    'should produce uuids',
    function () {
      // console.log(common.util.moment());
      assert.equal(common.crypto.uuid.v4().length, 36);
    }
  );
});