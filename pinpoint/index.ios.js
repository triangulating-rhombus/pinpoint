/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import Login from './src/components/login';
// Uncomment above once nagivation logic logic for routes->mapview is set up

import App from './src/components/mainApp.js'; 

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Uncomment this later on
import reducer from './src/reducers';

// Apply a thunk middleware which makes an instaneous evaluation delayed (to be called later once something else finishes?)
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// Give the store access to ALL reducers (combined reducers from index.js) 
// const store = createStoreWithMiddleware(reducer);

// store.subscribe(() => {
//   console.log('Username',store.getState());
// });

class Pinpoint extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducer)}>
        <App />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('pinpoint', () => Pinpoint);
