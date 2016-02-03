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
import Router from './src/router/router.js';

// Applies thunk middleware to handle more complex action dispatching
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// Connects reducers to store
var store = createStoreWithMiddleware(rootReducer);

// store.subscribe( () => {
//   console.log('STORE HAS CHANGED',store.getState());
// });

// This should actually be called after login
// But we put it here for now for testing


// store.subscribe(() => {
//   console.log('Username',store.getState());
// });

class Pinpoint extends Component {
  // Provider will pass down the application state to all components that navigation requires.
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