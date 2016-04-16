/**
 * represents a view independant collection component
 * TODO: refactor to uilib package
 * TODO: rename to readonly collection
 */

import common            from 'jsCommon';
import page              from './form_page';
import sortable          from './form_sortable';
import pending           from './form_pending';

const I = common.util.immutable;
const Either = common.data.either;
const _ = common.util.lodash;

const TYPE = 'COLLECTION';

/**
 * default state of a collection object
 * @param {string} name
 * @param {object jsonschema} itemSchema
 */
export function defaultState(name, itemSchema) {
  if(_.isUndefined(name)) {
    throw new Error('form.sortable.defaultState: require a name');
  }
  if(_.isUndefined(keys)) {
    throw new Error('form.sortable.defaultState: requires an itemSchema');
  }
  return I.Map({
    name: name,
    _type: TYPE,
    itemSchema: itemSchema,
    page: page.defaultState(name+'.page'),
    sortable: sortable.defaultState(name+'.sortable', _.keys(itemSchema.properties)),
    pending: pending.defaultState(name+'.pending')
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
  if(_.isUndefined(obj.keys)) {
    throw new Error('form.sortable.init: requires a key list');
  }
  let sorts = obj.sorts || [];
  return I.Map({
    name: obj.name,
    _type: TYPE,
    keys: I.List(obj.keys),
    sorts: I.List(_.map(sorts, s => I.Map(s)))
  });
}