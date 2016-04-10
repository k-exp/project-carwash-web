import common              from 'jsCommon';
/*
import { APP_RESIZE,
         SIDENAV_TOGGLE
       } from '../constants/action_types';
*/
const I = common.util.immutable;
const Either = common.data.either;

const initialState = I.Map({
  schema: Either.Pending('service schema pending'),
  data: Either.Pending('service data pending')
});

export default function (state = initialState, action) {
  switch(action.type) {

    default:
      return state;
  }
}
