import { Component } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loginUser from '../actions/action_login_user';
import Login from '../components/login.js';
import addSocket from '../actions/action_add_socket';

// Makes user state available to component
function mapStateToProps({ user, socket }) {
  return { user, socket };
}

// Makes loginUser action available to component 
function mapDispatchToProps(dispatch){
  return bindActionCreators({ loginUser, addSocket }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);





