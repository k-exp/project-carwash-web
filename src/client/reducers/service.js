import common from 'jsCommon';
import * as simpleCrud from '../util/form_simple_crud';
import * as collection from '../util/form_collection';


import { SERVICE_SCHEMA_INFO_PENDING,
         SERVICE_SCHEMA_INFO_SUCCEEDED,
         SERVICE_COLLECTION_READONLY_PENDING,
         SERVICE_READ_SUCCEEDED,
         SERVICE_READ_FAILED,
         SERVICE_READ_NEXT_PAGE,
         SERVICE_READ_PREV_PAGE
       } from '../constants/action_types';

const I = common.util.immutable;
const Either = common.data.either;
const _ = common.util.lodash;

/**
 * service is a 'simple' flat schema. as such, it has usual features (CRUD screens).
 */

const initialState = simpleCrud.defaultState('service');

export default function (state = initialState, action) {
  switch(action.type) {
    case SERVICE_SCHEMA_INFO_PENDING:
      return state.updateIn(['schemaStore', 'pending', 'isPending'], p => true);

    case SERVICE_SCHEMA_INFO_SUCCEEDED:
      return state.updateIn(['schemaStore', 'pending', 'isPending'], p => false)
                  .updateIn(['schemaStore', 'schema'], s => action.data)
                  .updateIn(['collection'], c => collection.setKeys(c, _.keys(action.data)));

    case SERVICE_COLLECTION_READONLY_PENDING:
      return state.updateIn(['collection', 'pending', 'isPending'], p => true);

    case SERVICE_READ_SUCCEEDED:
      return state.updateIn(['collection', 'page', 'count'], c => action.data.count)
                  .updateIn(['collection', 'data'], d => action.data.rows)
                  .updateIn(['collection', 'pending', 'isPending'], p => false)
                  .updateIn(['collection', '_isDirty'], d => false);


    case SERVICE_READ_FAILED:
      return state.updateIn(['collection', 'data'], d => action.data);

    case SERVICE_READ_NEXT_PAGE:
      return state.updateIn(['collection'], c => collection.pageNext(c));

    case SERVICE_READ_PREV_PAGE:
      return state.updateIn(['collection'], c => collection.pagePrev(c));

    default:
      return state;
  }
}
