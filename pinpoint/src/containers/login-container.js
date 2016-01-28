import { Login } from '../components/login.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import checkUser from '../actions/checkUserAction';
import { Component } from 'react-native';


// We're binding the checkuser action to login component 
function mapDispatchToProps(dispatch){
  return bindActionCreators({ checkUser }, dispatch);
}

// We're getting the application state from the store (via connect below) and sending it via props to Login
function mapStateToProps(state) {
  return {
    userProfile: state.userProfile
  };
}

//This is just the React/Redux way of connecting this login container to the omniscient store.
export default connect(mapStateToProps, mapDispatchToProps)(Login);





