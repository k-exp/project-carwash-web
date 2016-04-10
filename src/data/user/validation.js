import common from 'jsCommon';

const COMMAND = common.data.COMMAND;
const definer = common.util.definer;
const _ = common.util.lodash;
const ex = common.data.exception;

/*
 * validate an incoming create command
 */
export function validCreate(userCmd, next) {

  if(!_.has(userCmd.data, 'password')) {
    throw new ex.CommandValidationError(
      'incoming command data has no password',
      [],
      { 'password': '' }
    );
  }

  return next(null, userCmd);
}


/*
 * validate an incoming validation command
 */
export function validValidation(userCmd, next) {

  if(!_.has(userCmd.data, 'email')) {
    throw new ex.CommandValidationError(
      'incoming command data has no email',
      [],
      { 'email': '' }
    );
  }

  if(!_.has(userCmd.data, 'password')) {
    throw new ex.CommandValidationError(
      'incoming command data has no password',
      [],
      { 'password': '' }
    );
  }

  return next(null, userCmd);
}


/*
 * query result should have one item
 */
export function checkSingleResult(results, next) {
  if(results.length != 1) {
    throw new ex.SingleResultNotReturnedError(
      'query did not return a single result');
  }

  return next(null, results[0]);
}
