/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { AppRegistry, Component } from 'react-native';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './src/reducers';
import Router from './src/components/router';

// Applies thunk middleware to handle more complex action dispatching
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// Connects reducers to store
var store = createStoreWithMiddleware(rootReducer);

// store.subscribe( () => {
//   console.log('Markers:', store.getState().markers);
// });

// This should actually be called after login
// But we put it here for now for testing


class Pinpoint extends Component {
  // Makes store accessible to all components
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default store;
AppRegistry.registerComponent('pinpoint', () => Pinpoint);
