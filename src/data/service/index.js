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
    name: 'service',
    def: {
      name: {
        type: types.STRING,
        allowNull: false
      },
      selectorMapping: {
        type: types.STRING,
        allowNull: false
      },
      price: {
        type: types.DOUBLE,
      }
    }
  };
}


/**
 *
 */
function serviceCreateRequested(service, command) {
  return service.create(command.data)
    .then(function (result) {
      return new events.SERVICE_CREATE_SUCCEEDED({
        correlationId: command.commandId,
        data: result
      });
    })
    .catch(function (e) {
      return new events.SERVICE_CREATE_FAILED({
        correlationId: command.commandId,
        data: e
      });
    });
}


/**
 *
 */
function serviceUpdateRequested(service, command) {

}


/**
 *
 */
function serviceDeleteRequested(service, command) {

}


/**
 *
 */
function serviceReadRequested(service, command) {
  return service
    .findAndCountAll(command.data)
    .then(function (queryRes) {
      return new events.SERVICE_READ_SUCCEEDED({
        correlationId: command.commandId,
        data: queryRes
      });
    })
    .catch(function (e) {
      return new events.SERVICE_READ_FAILED({
        correlationId: command.commandId,
        data: e
      });
    });
}


/**
 * apply a single command to a service object
 */
function apply(service, command) {
  switch(command.commandType) {

    case 'SERVICE_CREATE_REQUESTED':
      return serviceCreateRequested(service, command);

    case 'SERVICE_UPDATE_REQUESTED':
      return serviceUpdateRequested(service, command);

    case 'SERVICE_DELETE_REQUESTED':
      return serviceDeleteRequested(service, command);

    case 'SERVICE_READ_REQUESTED':
      return serviceReadRequested(service, command);

    default:
      return new events.UNKNOWN_SERVICE_EVENT_RECEIVED();
  }
}


module.exports = {
  schema: schema,
  apply: apply,
  events: events,
  commands: commands
};