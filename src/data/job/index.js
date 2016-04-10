import common from 'jsCommon';
import * as commands from './commands';
import * as events from './events';


const _ = common.util.lodash;
const promise = common.util.promise;


/**
 * service type schema
 */
function schema(types) {
  return {
    name: 'job',
    def: {
      serviceStart: {
        type: types.DATE,
        allowNull: false
      },
      serviceEnd: {
        type: types.DATE
      }
    }
  };
}


/**
 *
 */
function jobCreateRequested(job, command) {
  return job.create(command.data)
    .then(function (result) {
      return new events.JOB_CREATE_SUCCEEDED({
        correlationId: command.commandId,
        data: result
      });
    })
    .catch(function (e) {
      return new events.JOB_CREATE_FAILED({
        correlationId: command.commandId,
        data: e
      });
    });
}


/**
 *
 */
function jobUpdateRequested(job, command) {

}


/**
 *
 */
function jobDeleteRequested(job, command) {

}


/**
 *
 */
function jobReadRequested(job, command) {
  return job
    .findAndCountAll(command.data)
    .then(function (queryRes) {
      return new events.JOB_READ_SUCCEEDED({
        correlationId: command.commandId,
        data: queryRes
      });
    })
    .catch(function (e) {
      return new events.JOB_READ_FAILED({
        correlationId: command.commandId,
        data: e
      });
    });
}


/**
 * apply a single command to a job object
 */
function apply(job, command) {
  switch(command.commandType) {

    case 'JOB_CREATE_REQUESTED':
      return jobCreateRequested(job, command);

    case 'JOB_UPDATE_REQUESTED':
      return jobUpdateRequested(job, command);

    case 'JOB_DELETE_REQUESTED':
      return jobDeleteRequested(job, command);

    case 'JOB_READ_REQUESTED':
      return jobReadRequested(job, command);

    default:
      return new events.UNKNOWN_JOB_EVENT_RECEIVED();
  }
}


module.exports = {
  schema: schema,
  apply: apply,
  events: events,
  commands: commands
};