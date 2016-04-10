import { SIDENAV_TOGGLE,
         CHANGE_VIEW 
       } from '../constants/action_types';


export function sidenavBtnClick() {
  return {
    type: SIDENAV_TOGGLE
  };
}


export function changeView(view) {
  return {
    type: CHANGE_VIEW,
    view: view
  };
}
