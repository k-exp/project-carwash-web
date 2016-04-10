import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import * as appActions                 from '../actions/app'
import { bindActionCreators }          from 'redux'
import common                          from 'jsCommon'

const _ = common.util.lodash


class App extends Component {
  render() {

    const {
      uiLayout,
      sidenavClick
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
                          Start Bootstrap
                      </a>
                  </li>
                  <li>
                      <a href="#">Dashboard</a>
                  </li>
                  <li>
                      <a href="#">Shortcuts</a>
                  </li>
                  <li>
                      <a href="#">Overview</a>
                  </li>
                  <li>
                      <a href="#">Events</a>
                  </li>
                  <li>
                      <a href="#">About</a>
                  </li>
                  <li>
                      <a href="#">Services</a>
                  </li>
                  <li>
                      <a href="#">Contact</a>
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
                          <h1>Simple Sidebar</h1>
                          <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
                          <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
                          <a href="#menu-toggle" className="btn btn-default" id="menu-toggle">Toggle Menu</a>
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
  sidenavClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    uiLayout: state.app.get('uiLayout').toJS()
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    sidenavClick: () => {
      dispatch(appActions.sidenavBtnClick());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
