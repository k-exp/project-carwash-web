
import container from './container';
import conf from './config.json';
import pgsqlConf from './src/persist/sql/pgsql';
import EventEmitter from 'events';
import readln from 'readline-sync';

const config = conf.prod;
const pgsql = pgsqlConf(config);
const loopE = new EventEmitter();
const models = container.models;


function handleUserReadAll() {
  models.user.apply(models.user.model, 
    new models.user.commands.USER_SAFEREAD_REQUESTED({
      data: { }
    })
  )
  .then(function (res) {
    var str = JSON.stringify(res, null, 2);
    console.info(str);
    loopE.emit('next');
  });
}

function handleUserCreate() {
  var email = readln.question('email> ');
  var password = readln.question('password> ', {
    hideEchoBack: true
  });  

  models.user.apply(models.user.model, 
    new models.user.commands.USER_CREATE_REQUESTED({
      data: {
        email: email,
        password: password
      }
    })
  )
  .then(function (res) {
    var str = JSON.stringify(res, null, 2);
    console.info(str);
    loopE.emit('next');
  });
}

function handleSyncUserModel() {
  pgsql.syncModel(models.user.model).then(function (res) {
    console.log('ok');
    loopE.emit('next');
  });  
}

function handleRedisGet() {
  var key = readln.question('key> ');
  container.redisClient
    .getAsync(key)
    .then(function (resp) {
      console.log(resp);
      loopE.emit('next');
    });
}

function handleRedisSet() {
  var key = readln.question('key> ');
  var value = readln.question('value> ');
  container.redisClient
    .setAsync(key, value)
    .then(function (resp) {
      console.log(resp);
      loopE.emit('next');
    });
}

function handleCustomerCreate() {
  var name = readln.question('name> ');

  models.customer.apply(models.customer.model, 
    new models.customer.commands.CUSTOMER_CREATE_REQUESTED({
      data: {
        name: name
      }
    })
  )
  .then(function (res) {
    var str = JSON.stringify(res, null, 2);
    console.info(str);
    loopE.emit('next');
  });
}

function handleServiceCreate() {
  var name = readln.question('name> ');
  var selectorMapping = readln.question('selectorMapping> ');
  var price = readln.question('price> ');

  models.service.apply(models.service.model, 
    new models.service.commands.SERVICE_CREATE_REQUESTED({
      data: {
        name: name,
        selectorMapping: selectorMapping,
        price: price
      }
    })
  )
  .then(function (res) {
    var str = JSON.stringify(res, null, 2);
    console.info(str);
    loopE.emit('next');
  });
}



function handleJobCreate() {
  var start = readln.question('start> ');
  var end = readln.question('end> ');

  models.job.apply(models.job.model, 
    new models.job.commands.JOB_CREATE_REQUESTED({
      data: {
        serviceStart: start,
        serviceEnd: end
      }
    })
  )
  .then(function (res) {
    var str = JSON.stringify(res, null, 2);
    console.info(str);
    loopE.emit('next');
  });
}

function handleConsoleCommand(cmd) {
  switch(cmd) {
    case 'user-create':
      handleUserCreate();
      break;

    case 'user-read-all':
      handleUserReadAll();
      break;

    case 'sync-user':
      handleSyncUserModel();
      break;

    case 'customer-create':
      handleCustomerCreate();
      break;

    case 'service-create':
      handleServiceCreate();
      break;

    case 'job-create':
      handleJobCreate();
      break;

    case 'redis-get':
      handleRedisGet();
      break;

    case 'redis-set':
      handleRedisSet();
      break;

    default:
      loopE.emit('next');
      break;
  }
}


loopE.on('next', () => {
  var cmd = readln.question('> ');
  if(cmd !== 'exit') {
    handleConsoleCommand(cmd);
  }
});
loopE.emit('next');