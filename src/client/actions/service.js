
import common            from 'jsCommon';
import * as ajax         from '../util/ajax';

export function getServiceSchema() {
  return dispatch => {
    ajax.optionsJsonAsync('/service')
      .then(function (res) {
        console.log(res);
        return res;
      });
  };
}