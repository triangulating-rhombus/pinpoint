import { Component } from 'react-native';
import { connect } from 'react-redux';
import MapView from '../components/mapView';
import setPoi from '../actions/action_set_poi';
import setTag from '../actions/action_set_tag';

function mapStateToProps({ user, socket, settings, markers, hotSpotVisibility, hotSpotPins, tag }) {
  return { user, socket, settings, markers, hotSpotVisibility, hotSpotPins, tag };
}

export default connect(mapStateToProps, { setPoi, setTag })(MapView);






