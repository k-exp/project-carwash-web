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
 */
export function defaultState(name) {
  if(_.isUndefined(name)) {
    throw new Error('form.collection.defaultState: require a name');
  }
  return I.Map({
    name: name,
    _type: TYPE,
    _isDirty: false,
    keys: I.List(),
    page: page.defaultState(`${name}.page`),
    sortable: sortable.defaultState(`${name}.sortable`),
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

/**
 * set keys
 * @param {iobject} state
 * @param {array} keys
 */
export function setKeys(state, keys) {
  return state.updateIn(['keys'], k => I.List(keys))
              .updateIn(['sortable'], s => sortable.setKeys(s, keys));
}

/**
 * page next, mark collection as dirty for refresh
 */
export function pageNext(state) {
  let currPage = state.get('page');
  let nextPage = page.next(currPage);
  if(!I.is(currPage, nextPage)) {
    return state.updateIn(['page'], p => nextPage)
                .updateIn(['_isDirty'], d => true);
  }
  return state;
}

/**
 * page prev, mark collection as dirty for refresh
 */
export function pagePrev(state) {
  let currPage = state.get('page');
  let prevPage = page.prev(currPage);
  if(!I.is(currPage, prevPage)) {
    return state.updateIn(['page'], p => prevPage)
                .updateIn(['_isDirty'], d => true);
  }
  return state;
}
