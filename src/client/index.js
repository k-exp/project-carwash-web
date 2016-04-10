import React                from 'react'
import { render }           from 'react-dom'
import { createStore,
         applyMiddleware }  from 'redux'
import { Provider }         from 'react-redux'
import logger               from 'redux-logger'
import thunk                from 'redux-thunk'
import reducer              from './reducers'
import App                  from './containers/app'
import common               from 'jsCommon'
import { resize }           from './actions/app'
import * as ajax            from './util/ajax'


const I = common.util.immutable;

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger() ]

const createStoreWithMiddleware = applyMiddleware(
  ...middleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
)


// https://github.com/YannickDot/redux-websocket-example/blob/master/app/src/js/app.js
