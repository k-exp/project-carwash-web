/**
 * represents a view independant sortable component
 * refactor to uilib package
 */

import common from 'jsCommon';
import * as schemaStore from './form_schema_store';

const I = common.util.immutable;
const Either = common.data.either;
const _ = common.util.lodash;

const TYPE = 'SIMPLE_CRUD';


/**
 * default state of a remote schema store object
 * @param {string} name
 */
export function defaultState(name) {
  if(_.isUndefined(name)) {
    throw new Error('form.simple_crud.defaultState: require a name');
  }
  return I.Map({
    name: name,
    _type: TYPE,
    schemaStore: schemaStore.defaultState(`${name}.schema_store`),
    collection: null
  });
}
