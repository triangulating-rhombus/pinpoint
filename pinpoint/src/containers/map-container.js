import { Component } from 'react-native';
import { connect } from 'react-redux';
import MapView from '../components/mapView';
import setPoi from '../actions/action_set_poi';
import updateAction from '../actions/action_update_geolocation.js';

function mapStateToProps({ user, socket, allUsers, hotSpotVisibility, currentTagLabel, settings, hotSpotPins }) {
  return { user, socket, allUsers, hotSpotVisibility, currentTagLabel, settings, hotSpotPins };
}

export default connect(mapStateToProps, { setPoi })(MapView);






