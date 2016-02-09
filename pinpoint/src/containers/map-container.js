import { Component } from 'react-native';
import { connect } from 'react-redux';
import MapView from '../components/mapView';
import setPoi from '../actions/action_set_poi';

function mapStateToProps({ user, socket, settings, markers, hotSpotVisibility, hotSpotPins }) {
  return { user, socket, settings, markers, hotSpotVisibility, hotSpotPins };
}

export default connect(mapStateToProps, { setPoi })(MapView);






