import { Component } from 'react-native';
import { connect } from 'react-redux';
import Login from '../components/login.js';
import loginUser from '../actions/action_login_user';

function mapStateToProps({ user, socket }) {
  return { user, socket };
}

export default connect(mapStateToProps, { loginUser })(Login);