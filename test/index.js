var common = require('jsCommon');
var assert = require('assert');


describe('crypto: uuid', function () {
  it(
    'should produce uuids',
    function () {
      // console.log(common.util.moment());
      assert.equal(common.crypto.uuid.v4().length, 36);
    }
  );
});