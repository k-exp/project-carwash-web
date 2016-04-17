
import common            from 'jsCommon';
import * as ajax         from '../util/ajax';

import { SERVICE_SCHEMA_INFO_PENDING,
         SERVICE_SCHEMA_INFO_SUCCEEDED,
         SERVICE_COLLECTION_READONLY_PENDING,
         SERVICE_READ_SUCCEEDED,
         SERVICE_READ_FAILED,
         SERVICE_READ_NEXT_PAGE,
         SERVICE_READ_PREV_PAGE
       } from '../constants/action_types';


export function getServiceSchema() {
  return dispatch => {

    dispatch({ type: SERVICE_SCHEMA_INFO_PENDING });

    ajax.optionsJsonAsync('/service')
      .then(function (res) {
        dispatch({ 
          type: SERVICE_SCHEMA_INFO_SUCCEEDED, 
          data: res.data 
        });
        return res;
      });
  };
}

export function readServiceCollection(collection) {
  return dispatch => {

    dispatch({ type: SERVICE_COLLECTION_READONLY_PENDING });

    let page = collection.page;
    let query = [
      'limit='+page.size,
      'offset='+((page.page-1) * page.size)
    ].join('&');

    setTimeout(function () {
      ajax.getJsonNoCacheAsync('/service?'+query)
        .then(function (res) {
          dispatch({ 
            type: res.eventType, 
            data: res.data 
          });
          return res;
        });      
    }, 500);

  };
}

export function nextPage() {
  return {
    type: SERVICE_READ_NEXT_PAGE
  };
}

export function prevPage() {
  return {
    type: SERVICE_READ_PREV_PAGE
  };
}
