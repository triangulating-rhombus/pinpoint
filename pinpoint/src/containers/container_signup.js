import { Component } from 'react-native';
import { connect } from 'react-redux';
import Signup from '../components/signup.js';
import signupUser from '../actions/action_signup_user';
import clearUserError from '../actions/action_clear_user_error';

// Makes user state available to component
function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { signupUser, clearUserError })(Signup);