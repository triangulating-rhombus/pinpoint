import MapView from '../components/mapView.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import checkUser from '../actions/checkUserAction';
import { Component } from 'react-native';


function mapDispatchToProps(dispatch){
  return bindActionCreators({ checkUser }, dispatch);
}

function mapStateToProps(state) {
  // Whatever gets returned from here will show up as props from BookList
  return {
    userProfile: state.userProfile
  };
}

//How do you write this so it's not so 'efficient'? It makes it confusing 
export default connect(mapStateToProps, mapDispatchToProps)(MapView);





