/**
 * represents a view independant pending component
 * refactor to uilib package
 */

import common              from 'jsCommon';

const I = common.util.immutable;
const Either = common.data.either;
const _ = common.util.lodash;

const TYPE = 'PENDING';

/**
 * default state of a pending object
 * @param {string} name
 */
export function defaultState(name) {
  if(_.isUndefined(name)) {
    throw new Error('form.pending.defaultState: require a name');
  }
  return I.Map({
    name: name,
    _type: TYPE,
    isPending: false
  });
}

/**
 * initialize pending state from object
 * @param {object} obj
 */
export function init(obj) {
  if(_.isUndefined(obj)) {
    throw new Error('form.pending.init: require an object arg');
  }
  if(_.isUndefined(obj.name)) {
    throw new Error('form.pending.init: object arg requires a name');
  }
  return I.Map({
    name: obj.name,
    _type: TYPE,
    isPending: obj.isPending || false
  });
}

/**
 * set isPending to the value of flag
 * @param {bool} flag
 */
export function setPending(state, flag) {
  return state.updateIn(['isPending'], s => flag);
}

/**
 * toggle isPending flag
 */
export function togglePending(state, flag) {
  return state.updateIn(['isPending'], s => !flag);
}