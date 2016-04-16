/**
 * represents a view independant collection component
 * TODO: refactor to uilib package
 * TODO: rename to readonly collection
 */

import common            from 'jsCommon';
import * as page         from './form_page';
import * as sortable     from './form_sortable';
import * as pending      from './form_pending';

const I = common.util.immutable;
const Either = common.data.either;
const _ = common.util.lodash;

const TYPE = 'COLLECTION';

/**
 * default state of a collection object
 * @param {string} name
 * @param {array} keys
 */
export function defaultState(name, keys) {
  if(_.isUndefined(name)) {
    throw new Error('form.collection.defaultState: require a name');
  }
  if(_.isUndefined(keys)) {
    throw new Error('form.collection.defaultState: requires an keys');
  }
  return I.Map({
    name: name,
    _type: TYPE,
    keys: I.List(keys),
    page: page.defaultState(`${name}.page`),
    sortable: sortable.defaultState(`${name}.sortable`, keys),
    pending: pending.defaultState(`${name}.pending`),
    data: null
  });
}

/**
 * initialize sortable state from object
 * @param {object} obj
 */
export function init(obj) {
  throw new Error('form.collection.init: not implemented');
}
