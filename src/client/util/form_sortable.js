/**
 * represents a view independant sortable component
 * refactor to uilib package
 */

import common              from 'jsCommon';

const I = common.util.immutable;
const Either = common.data.either;
const _ = common.util.lodash;

const TYPE = 'SORTABLE';


/**
 * default state of a remote sortable object
 * @param {string} name
 */
export function defaultState(name) {
  if(_.isUndefined(name)) {
    throw new Error('form.sortable.defaultState: require a name');
  }
  return I.Map({
    name: name,
    _type: TYPE,
    keys: I.List(),
    sorts: I.List()
  });
}

/**
 * initialize sortable state from object
 * @param {object} obj
 */
export function init(obj) {
  if(_.isUndefined(obj)) {
    throw new Error('form.sortable.init: require an object arg');
  }
  if(_.isUndefined(obj.name)) {
    throw new Error('form.sortable.init: object arg requires a name');
  }
  let keys = obj.keys || [];
  let sorts = obj.sorts || [];
  return I.Map({
    name: obj.name,
    _type: TYPE,
    keys: I.List(keys),
    sorts: I.List(_.map(sorts, s => I.Map(s)))
  });
}

/**
 * construct ascending sort
 * @param {string} key
 */
export function sortAsc(key) {
  return I.Map({ key: key, type: 'ASC' });
}

/**
 * construct descending sort
 * @param {string} key
 */
export function sortDesc(key) {
  return I.Map({ key: key, type: 'DESC' });
}

/**
 * set keys
 * @param {iobject} state
 * @param {array} keys
 */
export function setKeys(state, keys) {
  return state.updateIn(['keys'], k => I.List(keys))
              .updateIn(['sorts'], s => I.List());
}

/**
 * set a sort, if sort is not present in @sorts add an ASC for schema key
 * if present in @sorts and is ASC change entry to DESC
 * if present in @sorts and is DESC remove from @sorts
 * @param {iobject} state
 * @param {string} key
 */
export function setSortCycle(state, key) {
  // TODO: check that key is in keys
  // TODO: check that state has type SORTABLE
  let sorts = state.get('sorts');
  let idx = sorts.findIndex(s => s.get('key') === key);
  if(idx === -1) {
    return state.updateIn(['sorts'], s => s.push(sortAsc(key)));
  }
  else {
    let item = sorts.get(idx);
    switch (item.get('type')) {
      case 'ASC':
        return state.updateIn(['sorts'], s => s.set(idx, sortDesc(key)));
      default:
        return state.updateIn(['sorts'], s => s.delete(idx));
    }
  }
}