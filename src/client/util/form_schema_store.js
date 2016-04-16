/**
 * represents a view independant sortable component
 * refactor to uilib package
 */

import common from 'jsCommon';
import * as pending from './form_pending';

const I = common.util.immutable;
const Either = common.data.either;
const _ = common.util.lodash;

const TYPE = 'SCHEMA_STORE';


/**
 * default state of a remote schema store object
 * @param {string} name
 */
export function defaultState(name) {
  if(_.isUndefined(name)) {
    throw new Error('form.schema_store.defaultState: require a name');
  }
  return I.Map({
    name: name,
    _type: TYPE,
    pending: pending.defaultState(`${name}.pending`),
    schema: null
  });
}
