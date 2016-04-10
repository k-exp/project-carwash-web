import { combineReducers } from 'redux';
import common              from 'jsCommon';
import { APP_RESIZE,
         SIDENAV_TOGGLE,
         CHANGE_VIEW
       } from '../constants/action_types';
import service from './service';

const I = common.util.immutable;

const initialState = I.Map({
  uiLayout: I.Map({
    height: 0,
    width: 0,
    isSideNavCollapsed: true
  }),

  /**
   * SERVICE, CUSTOMER, JOB, STATS
   */
  currentViewKey: 'SERVICE'
});

function app(state = initialState, action) {
  switch(action.type) {

    case SIDENAV_TOGGLE:
      return state.updateIn(['uiLayout'], m => m.merge({
        isSideNavCollapsed: !m.get('isSideNavCollapsed')
      }));

    case CHANGE_VIEW:
      return state.updateIn(['currentViewKey'], m => action.view);

    default:
      return state;
  }
}

export default combineReducers({
  app,
  service
});
