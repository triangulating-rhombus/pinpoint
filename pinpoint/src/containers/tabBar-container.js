import { Component } from 'react-native';
import { connect } from 'react-redux';
import TabBar from '../components/tabBar.js';
import logoutUser from '../actions/action_logout_user';

export default connect(null, { logoutUser })(TabBar);