import redis from 'redis';
import common from 'jsCommon';

import user from './src/data/user';
import customer from './src/data/customer';
import service from './src/data/service';
import job from './src/data/job';

import conf from './config.json';
import pgsqlConf from './src/persist/sql/pgsql';


const config = conf.prod;
const pgsql = pgsqlConf(config);
const promise = common.util.promise;

promise.promisifyAll(redis.RedisClient.prototype);
promise.promisifyAll(redis.Multi.prototype);


/**
 * used when a client requested the schema of an entity
 */
const clientTypemap = {
  STRING: 'string',
  BOOLEAN: 'bool',
  INTEGER: 'int',
  DOUBLE: 'number',
  FLOAT: 'number',
  DATE: 'datetime'
};


/**
 * system users
 */
var userMdlSchema = user.schema(pgsql.dbStatic());
var userMdl = pgsql.createModel(
  pgsql.initConn, 
  userMdlSchema, 
  { freezeTableName: true }
);

/**
 * customers 
 */
var customerMdlSchema = customer.schema(pgsql.dbStatic());
var customerMdl = pgsql.createModel(
  pgsql.initConn, 
  customerMdlSchema, 
  { freezeTableName: true }
);


/**
 * service types 
 */
var serviceMdlSchema = service.schema(pgsql.dbStatic());
var serviceMdl = pgsql.createModel(
  pgsql.initConn, 
  serviceMdlSchema, 
  { freezeTableName: true }
);


/**
 * service jobs 
 */
var jobMdlSchema = job.schema(pgsql.dbStatic());
var jobMdl = pgsql.createModel(
  pgsql.initConn, 
  jobMdlSchema, 
  { freezeTableName: true }
);


export default {
  models: {
    user: {
      schema: user.schema(clientTypemap),
      model: userMdl,
      commands: user.commands,
      events: user.events,
      apply: user.apply
    },
    customer: {
      schema: customer.schema(clientTypemap),
      model: customerMdl,
      commands: customer.commands,
      events: customer.events,
      apply: customer.apply
    },
    service: {
      schema: service.schema(clientTypemap),
      model: serviceMdl,
      commands: service.commands,
      events: service.events,
      apply: service.apply
    },
    job: {
      schema: job.schema(clientTypemap),
      model: jobMdl,
      commands: job.commands,
      events: job.events,
      apply: job.apply
    }
  },
  redisClient: redis.createClient({
    host: config.redis.host,
    port: config.redis.port
  })
}