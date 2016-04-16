/**
 * represents a view independant pending component
 * refactor to uilib package
 */

import common              from 'jsCommon';

const I = common.util.immutable;
const Either = common.data.either;
const _ = common.util.lodash;

const TYPE = 'PENDING';