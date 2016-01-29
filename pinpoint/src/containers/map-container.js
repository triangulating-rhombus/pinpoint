import { Component } from 'react-native';
import { connect } from 'react-redux';
import MapView from '../components/mapView.js';

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(MapView);





