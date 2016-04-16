import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import * as serviceActions                 from '../actions/service'
import { bindActionCreators }          from 'redux'
import common                          from 'jsCommon'

const _ = common.util.lodash


class Service extends Component {
  render() {
    return (
      <div className="view-content">
        <p>ok</p>
      </div>
    );
  }

  componentDidMount() {
    this.props.getServiceSchema()
  }
}

Service.propTypes = {
  schema: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getServiceSchema: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    schema: {},
    data: {}
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getServiceSchema: () => {
      dispatch(serviceActions.getServiceSchema());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Service)
