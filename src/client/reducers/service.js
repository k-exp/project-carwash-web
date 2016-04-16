import common              from 'jsCommon';

/*
import { APP_RESIZE,
         SIDENAV_TOGGLE
       } from '../constants/action_types';
*/

const I = common.util.immutable;
const Either = common.data.either;

/**
 * service is a 'simple' flat schema. as such, it has usual features (CRUD screens).
 */

const initialState = I.Map({
  schema: Either.Pending('service schema pending'),
  data: Either.Pending('service data pending'),
  pageState: I.Map({
    page: 1,
    size: 10,
    count: 0
  })
});

export default function (state = initialState, action) {
  switch(action.type) {

    default:
      return state;
  }
}
