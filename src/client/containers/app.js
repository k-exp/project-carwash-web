import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import * as appActions                 from '../actions/app'
import { bindActionCreators }          from 'redux'
import common                          from 'jsCommon'
import Service                         from './service';

const _ = common.util.lodash

function _renderSelectedView(currentViewKey) {
  switch(currentViewKey) {
    case 'SERVICE':
      return (<Service />);

    default:
      return (<p>not found</p>);
  }
}


class App extends Component {
  render() {

    const {
      uiLayout,
      currentViewKey,
      sidenavClick,
      viewClick
    } = this.props;

    const collapseQuantity = uiLayout.isSideNavCollapsed ?
      0 :
      250;
    const wrapperStyle = { paddingLeft: collapseQuantity };
    const sidebarWrapperStyle = { width: collapseQuantity };
    const sidebarButtonStyle = { left: collapseQuantity + 5 };

    return (
      <div id="wrapper" style={wrapperStyle}>

          <div id="sidebar-wrapper" style={sidebarWrapperStyle}>
              <ul className="sidebar-nav">
                  <li className="sidebar-brand">
                      <a href="#">
                          APP
                      </a>
                  </li>
                  <li>
                      <a href="#"
                         data-viewkey={'SERVICE'}
                         onClick={viewClick}>Services</a>
                  </li>
                  <li>
                      <a href="#"
                         data-viewkey={'CUSTOMER'}
                         onClick={viewClick}>Customers</a>
                  </li>
                  <li>
                      <a href="#"
                         data-viewkey={'JOB'}
                         onClick={viewClick}>Jobs</a>
                  </li>
                  <li>
                      <a href="#"
                         data-viewkey={'STATS'}
                         onClick={viewClick}>Statistics</a>
                  </li>
              </ul>
          </div>

          <button className="sidebar-button" 
                  style={sidebarButtonStyle}
                  onClick={sidenavClick}>x</button>

          <div id="page-content-wrapper">
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-lg-12">
                          <h1>{currentViewKey}</h1>
                          {_renderSelectedView(currentViewKey)}
                      </div>
                  </div>
              </div>
          </div>

      </div>
    )
  }
}

App.propTypes = {
  uiLayout: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    isSideNavCollapsed: PropTypes.bool.isRequired
  }).isRequired,
  currentViewKey: PropTypes.string.isRequired,
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
