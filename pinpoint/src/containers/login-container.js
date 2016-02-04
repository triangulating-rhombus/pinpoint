import { Component } from 'react-native';
import { connect } from 'react-redux';
import Login from '../components/login.js';
import loginUser from '../actions/action_login_user';
import addSocket from '../actions/action_add_socket';

function mapStateToProps({ user, socket }) {
  return { user, socket };
}

export default connect(mapStateToProps, { loginUser, addSocket })(Login);





