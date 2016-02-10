import { Component } from 'react-native';
import { connect } from 'react-redux';
import MapView from '../components/mapView';
import updateStats from '../actions/action_update_stats';
import setTag from '../actions/action_set_tag';

function mapStateToProps({ user, socket, settings, markers, hotSpotVisibility, hotSpotPins, tag }) {
  return { user, socket, settings, markers, hotSpotVisibility, hotSpotPins, tag };
}

export default connect(mapStateToProps, { updateStats, setTag })(MapView);






