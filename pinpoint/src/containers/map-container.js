import { Component } from 'react-native';
import { connect } from 'react-redux';
import MapView from '../components/mapView.js';


function mapStateToProps({ user, socket, allUsers, hotSpotVisibility  }) {
  return { user, socket, allUsers, hotSpotVisibility };
}

export default connect(mapStateToProps)(MapView);





