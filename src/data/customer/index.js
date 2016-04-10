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
    name: 'customer',
    def: {
      name: {
        type: types.STRING,
        allowNull: false
      }
    }
  };
}


/**
 *
 */
function customerCreateRequested(customer, command) {
  return customer.create(command.data)
    .then(function (result) {
      return new events.CUSTOMER_CREATE_SUCCEEDED({
        correlationId: command.commandId,
        data: result
      });
    })
    .catch(function (e) {
      return new events.CUSTOMER_CREATE_FAILED({
        correlationId: command.commandId,
        data: e
      });
    });
}


/**
 *
 */
function customerUpdateRequested(customer, command) {

}


/**
 *
 */
function customerDeleteRequested(customer, command) {

}


/**
 *
 */
function customerReadRequested(customer, command) {
  return customer
    .findAndCountAll(command.data)
    .then(function (queryRes) {
      return new events.CUSTOMER_READ_SUCCEEDED({
        correlationId: command.commandId,
        data: queryRes
      });
    })
    .catch(function (e) {
      return new events.CUSTOMER_READ_FAILED({
        correlationId: command.commandId,
        data: e
      });
    });
}


/**
 * apply a single command to a customer object
 */
function apply(customer, command) {
  switch(command.commandType) {

    case 'CUSTOMER_CREATE_REQUESTED':
      return customerCreateRequested(customer, command);

    case 'CUSTOMER_UPDATE_REQUESTED':
      return customerUpdateRequested(customer, command);

    case 'CUSTOMER_DELETE_REQUESTED':
      return customerDeleteRequested(customer, command);

    case 'CUSTOMER_READ_REQUESTED':
      return customerReadRequested(customer, command);

    default:
      return new events.UNKNOWN_CUSTOMER_EVENT_RECEIVED();
  }
}


module.exports = {
  schema: schema,
  apply: apply,
  events: events,
  commands: commands
};
