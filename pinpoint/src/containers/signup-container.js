import { Component } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import signupUser from '../actions/action_signup_user';
import Signup from '../components/signup.js';
import addSocket from '../actions/action_add_socket';

// Makes user state available to component
function mapStateToProps({ user, socket }) {
  return { user, socket };
}

// Makes signupUser action available to component 
function mapDispatchToProps(dispatch){
  return bindActionCreators({ signupUser, addSocket }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);