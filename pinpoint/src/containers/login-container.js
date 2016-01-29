import { Component } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import checkUser from '../actions/checkUserAction';
import Login from '../components/login.js';

// Makes userProfile state available to login component
function mapStateToProps(state) {
  return {
    userProfile: state.userProfile
  };
}

// Makes checkUser action available to login component 
function mapDispatchToProps(dispatch){
  return bindActionCreators({ checkUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);





