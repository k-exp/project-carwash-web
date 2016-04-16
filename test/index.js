var common   = require('jsCommon');
var assert   = require('assert');
var c        = require('chalk');
var dat      = require('./data');
var page     = require('../src/client/util/form_page');
var sortable = require('../src/client/util/form_sortable');

const I = common.util.immutable;
const Either = common.data.either;

/**
 * FORM PAGE
 */

describe('client:util:form_page defaultState', () => {
  it(
    c.yellow('fails when no name is given'),
    () => {
      assert.throws(() => page.defaultState(), Error);
    }
  );
  it(
    c.yellow('default count is 0'),
    () => {
      let defl = page.defaultState('test');
      assert.equal(defl.get('count'), 0);
    }
  );
  it(
    c.yellow('default size is 10'),
    () => {
      let defl = page.defaultState('test');
      assert.equal(defl.get('size'), 10);
    }
  );
  it(
    c.yellow('default page is 1'),
    () => {
      let defl = page.defaultState('test');
      assert.equal(defl.get('page'), 1);
    }
  );
});


describe('client:util:form_page init', () => {
  it(
    c.yellow('fails when no object arg is given'),
    () => {
      assert.throws(() => page.init(), Error);
    }
  );
  it(
    c.yellow('fails when no object.name arg is given'),
    () => {
      assert.throws(() => page.init({}), Error);
    }
  );
  it(
    c.yellow('init\'ing with name only is the same as defaultState'),
    () => {
      let defl = page.defaultState('test');
      let defl2 = page.init({name: 'test'});
      assert(I.is(defl, defl2) === true);
    }
  );
  it(
    c.yellow('init\'ing with object sets properties'),
    () => {
      let defl = page.init({name: 'test', count: 100, size: 15, page: 2});
      assert.equal(defl.get('name'), 'test');
      assert.equal(defl.get('count'), 100);
      assert.equal(defl.get('size'), 15);
      assert.equal(defl.get('page'), 2);
    }
  );
});


describe('client:util:form_page maxPage', () => {
  it(
    c.yellow('max page of collection with 0 items is 1'),
    () => {
      let defl = page.init({name: 'test', count: 0, size: 15, page: 1});
      let maxPage = page.maxPage(defl);
      assert.equal(maxPage, 1);
    }
  );
});


describe('client:util:form_page prev', () => {
  it(
    c.yellow('calling previous on the first page does nothing'),
    () => {
      let defl = page.init({name: 'test', count: 100, size: 15, page: 1});
      let next = page.prev(defl);
      assert(I.is(defl, next) === true);
    }
  );
  it(
    c.yellow('calling previous on a page decrements the page number'),
    () => {
      let defl = page.init({name: 'test', count: 100, size: 15, page: 2});
      let next = page.prev(defl);
      assert.equal(next.get('page'), 1);
    }
  );
});


describe('client:util:form_page next', () => {
  it(
    c.yellow('calling next on the last page does nothing'),
    () => {
      let defl = page.init({name: 'test', count: 100, size: 15, page: 7});
      let next = page.next(defl);
      assert(I.is(defl, next) === true);
    }
  );
  it(
    c.yellow('calling next on a page increments the page number'),
    () => {
      let defl = page.init({name: 'test', count: 100, size: 15, page: 2});
      let next = page.next(defl);
      assert.equal(next.get('page'), 3);
    }
  );
});


/**
 * FORM SORTABLE
 */
describe('client:util:form_sortable defaultState', () => {
  it(
    c.yellow('fails when no name is given'),
    () => {
      assert.throws(() => sortable.defaultState(), Error);
    }
  );
  it(
    c.yellow('fails when no keys are given'),
    () => {
      assert.throws(() => sortable.defaultState('test'), Error);
    }
  );
  it(
    c.yellow('default sorts collection is empty'),
    () => {
      let defl = sortable.defaultState('test', []);
      assert.equal(defl.get('sorts').count(), 0);
    }
  );
});


describe('client:util:form_sortable init', () => {
  it(
    c.yellow('fails when no object arg is given'),
    () => {
      assert.throws(() => sortable.init(), Error);
    }
  );
  it(
    c.yellow('fails when no object.name arg is given'),
    () => {
      assert.throws(() => sortable.init({}), Error);
    }
  );
  it(
    c.yellow('fails when no object.keys are given'),
    () => {
      assert.throws(() => sortable.init({name:'test'}), Error);
    }
  );
  it(
    c.yellow('init\'ing with name and keys only is the same as defaultState'),
    () => {
      let defl = sortable.defaultState('test', ['k1']);
      let defl2 = sortable.init({name: 'test', keys: ['k1']});
      assert(I.is(defl, defl2) === true);
    }
  );
  it(
    c.yellow('init\'ing with object sets properties'),
    () => {
      let defl = sortable.init({
        name: 'test', 
        keys: ['k1'], 
        sorts: [{key: 'k1', type: 'ASC'}]
      });
      assert.equal(defl.get('name'), 'test');
      assert(I.is(defl.get('keys'), I.List(['k1'])) === true);
      assert(I.is(defl.get('sorts'), I.List([sortable.sortAsc('k1')])) === true);
    }
  );
  it(
    c.yellow('setSortCycle toggles sort types'),
    () => {
      let defl = sortable.init({
        name: 'test', 
        keys: ['k1', 'k2'], 
        sorts: []
      });
      let cycle1 = sortable.setSortCycle(defl, 'k1');
      let cycle2 = sortable.setSortCycle(cycle1, 'k1');
      let cycle3 = sortable.setSortCycle(cycle2, 'k1');

      assert(I.is(cycle1.get('sorts'), I.List([sortable.sortAsc('k1')])) === true);
      assert(I.is(cycle2.get('sorts'), I.List([sortable.sortDesc('k1')])) === true);
      assert(I.is(cycle3.get('sorts'), I.List()) === true);
    }
  );
});
