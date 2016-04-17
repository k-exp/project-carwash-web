import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import * as serviceActions                 from '../actions/service'
import { bindActionCreators }          from 'redux'
import common                          from 'jsCommon'

const _ = common.util.lodash


function _renderServiceCollectionView(props) {
  const {
    keys,
    page,
    sortable,
    pending,
    data
  } = props.collection;

  let isPendingOrHasNoData = data === null || pending.isPending;

  if(isPendingOrHasNoData) {
    let heads = _.map(keys, k => (<th key={'head_'+k}>{k}</th>));

    return (
      <div className="view-content"> 
        <nav>
          <ul className="pager pull-left">
            <li><a href="#">Previous</a></li>
            <li><a href="#">Next</a></li>
          </ul>
        </nav>        
        <table className="table">
          <thead>
            <tr>
              <th>options</th>
              {heads}
            </tr> 
          </thead> 
          <tbody> 
            <tr> 
              <td>cmds</td>
              <td>pending</td>
              <td>message</td>
              <td>here</td> 
            </tr> 
          </tbody> 
        </table>
      </div>  
    );
  }
  else {
    let heads = _.map(keys, k => (<th key={'head_'+k}>{k}</th>));
    let rows = _.map(data, d => {
      let id = d.id;
      let arr = _.map(keys, dk => {
        return (<td key={'data_'+dk+'_'+id}>{d[dk]}</td>);
      });
      arr.unshift(
        <td key={'data_cmd_'+id}>
          <button className="btn btn-default btn-collection-edit btn-warning">
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
          <button className="btn btn-default btn-collection-delete btn-danger">
            <i className="fa fa-times-circle-o" aria-hidden="true"></i>
          </button>
        </td>
      );
      return (<tr key={'data_row_'+id}>{arr}</tr>);
    });

    return (
      <div className="view-content">     
        <nav>
          <ul className="pager pull-left">
            <li><a href="#" onClick={props.pagePrev}>Previous</a></li>
            <li><a href="#" onClick={props.pageNext}>Next</a></li>
          </ul>
        </nav>     
        <table className="table">
          <thead>
            <tr>
              <th>options</th>
              {heads}
            </tr> 
          </thead> 
          <tbody> 
            {rows}
          </tbody> 
        </table>
      </div>  
    );
  }
}

function _renderService(props) {
    let schema = props.schemaStore;
    let schemaNullOrEmpty = schema.schema === null || 
                            schema.pending.isPending;

    if(schemaNullOrEmpty) {
      return (
        <div className="view-content">
          <p>LOADING</p>
        </div>
      );      
    }

    let isInCollectionViewMode = props.focus === 'collection';
    if(isInCollectionViewMode) {
      return _renderServiceCollectionView(props);
    }
    // component is in collection view mode and has not fetched data


    // component is in collection view mode and has fetched data


    // component is in unknown view mode
    return (
      <div className="view-content">
        <p>SCHEMA LOADED</p>
      </div>
    );    


}


class Service extends Component {
  render() {
    return _renderService(this.props);
  }

  componentDidMount() {
    let schema = this.props.schemaStore;
    let schemaNeedsFetch = schema.schema === null && 
                           !schema.pending.isPending;

    if(schemaNeedsFetch) {
      console.log('fetch schema');
      this.props.getServiceSchema();
    }
  }

  componentDidUpdate(prevProps) {
    // component is in collection view mode. it has NO data and is NOT pending
    // this is a signal to fetch data from server

    let schema = this.props.schemaStore;
    let hasSchema = schema.schema !== null && 
                    !schema.pending.isPending;

    let inCollectionModeDirty = this.props.focus === 'collection' &&
                                this.props.collection.data !== null &&
                                !this.props.collection.pending.isPending &&
                                this.props.collection._isDirty;

    let inCollectionModeInit = this.props.focus === 'collection' &&
                               this.props.collection.data === null &&
                               !this.props.collection.pending.isPending &&
                               !this.props.collection._isDirty;

    if(hasSchema && (inCollectionModeInit || inCollectionModeDirty)) {
      this.props.getServiceCollection(this.props.collection);
    }
    
  }
}

Service.propTypes = {
  focus: PropTypes.string.isRequired,
  schemaStore: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  getServiceSchema: PropTypes.func.isRequired,
  getServiceCollection: PropTypes.func.isRequired,
  pageNext: PropTypes.func.isRequired,
  pagePrev: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    focus: state.service.get('focus'),
    schemaStore: state.service.get('schemaStore').toJS(),
    collection: state.service.get('collection').toJS()
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getServiceSchema: () => {
      dispatch(serviceActions.getServiceSchema());
    },
    getServiceCollection: (collection) => {
      dispatch(serviceActions.readServiceCollection(collection));
    },
    pageNext: (e) => {
      e.preventDefault();
      dispatch(serviceActions.nextPage());
    },
    pagePrev: (e) => {
      e.preventDefault();
      dispatch(serviceActions.prevPage());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Service)
