/**
 * represents a view independant pager component
 * refactor to uilib package
 */

import common              from 'jsCommon';

const I = common.util.immutable;
const Either = common.data.either;
const _ = common.util.lodash;

const TYPE = 'PAGE';


/**
 * default state of a pager object
 * @param {string} name
 */
export function defaultState(name) {
  if(_.isUndefined(name)) {
    throw new Error('form.page.defaultState: require a name');
  }
  return I.Map({
    name: name,
    _type: TYPE,
    page: 1,
    size: 10,
    count: 0    
  });
}

/**
 * initialize page state from object
 * @param {object} obj
 */
export function init(obj) {
  if(_.isUndefined(obj)) {
    throw new Error('form.page.init: require an object arg');
  }
  if(_.isUndefined(obj.name)) {
    throw new Error('form.page.init: object arg requires a name');
  }
  return I.Map({
    name: obj.name,
    _type: TYPE,
    page: obj.page || 1,
    size: obj.size || 10,
    count: obj.count || 0
  });
}

/**
 * compute max page number
 * @param {iobject} state
 */
export function maxPage(state) {
  let size = state.get('size');
  let count = state.get('count');
  return Math.floor(count / size) + 1;
}

/**
 * goto previous page. do nothing if first page
 * @param {iobject} state
 */
export function prev(state) {
  let page = state.get('page');
  if(page <= 1) {
    return state;
  }
  return state.set('page', page - 1);
}

/**
 * goto next page. do nothing if max page
 * @param {iobject} state
 */
export function next(state) {
  let page = state.get('page');
  let maxP = maxPage(state);
  if(page >= maxP) {
    return state;
  }
  return state.set('page', page + 1);
}

/**
 * compute limit and offset
 * @param {iobject} state
 */
export function asLimitOffset(state) {
  let page = state.get('page');
  let size = state.get('size');
  let count = state.get('count');
  return { limit: size, offset: (page-1) * size };
}
