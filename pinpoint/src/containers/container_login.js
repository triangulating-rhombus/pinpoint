import { Component } from 'react-native';
import { connect } from 'react-redux';
import Login from '../components/login.js';
import loginUser from '../actions/action_login_user';
import clearUserError from '../actions/action_clear_user_error';

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { loginUser, clearUserError })(Login);