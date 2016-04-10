import common from 'jsCommon';

const _ = common.util.lodash;


function jobData() {

  var start = common.util.moment();
  var end = common.util.moment().add(2, 'minutes');


  var job = {
    serviceStart: start._d,
    serviceEnd: end._d
  };

  return function () {
    start = common.util.moment(end._d);
    end = common.util.moment(start._d).add(2, 'minutes');

    var curr = job;
    
    job = {
      serviceStart: start._d,
      serviceEnd: end._d
    };

    return curr;
  }
}

var jobs = (function () {
  var creator = jobData();
  var ls = [];
  for(var i = 1; i < 101; i++) {
    ls.push({
        commandType: 'JOB_CREATE_REQUESTED',
        commandId: i,
        timestamp: i,
        data: creator()
      });
  }
  return ls;
})();

export default jobs;