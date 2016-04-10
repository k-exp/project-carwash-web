import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import * as appActions                 from '../actions/app'
import { bindActionCreators }          from 'redux'
import common                          from 'jsCommon'

const _ = common.util.lodash


class Service extends Component {
  render() {
    return (
      <div className="view-content">
        <p>ok</p>
      </div>
    )
  }
}

App.propTypes = {
  schema: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  sidenavClick: PropTypes.func.isRequired,
  viewClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    uiLayout: state.app.get('uiLayout').toJS(),
    currentViewKey: state.app.get('currentViewKey')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    sidenavClick: () => {
      dispatch(appActions.sidenavBtnClick());
    },
    viewClick: (e) => {
      dispatch(appActions.changeView(e.target.dataset.viewkey));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
