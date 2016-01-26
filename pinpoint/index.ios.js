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

import Login from './src/components/login';
// Uncomment above once nagivation logic logic for routes->mapview is set up 

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Uncomment this later on
// import reducer from './reducer/index.js';

// Apply a thunk middleware which makes an instaneous evaluation delayed (to be called later once something else finishes?)
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// Give the store access to ALL reducers (combined reducers from index.js) 
// const store = createStoreWithMiddleware(reducer);







class pinpoint extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Log in to Pinpoint!
        </Text>

        <Login />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('pinpoint', () => pinpoint);
