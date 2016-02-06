import { Component } from 'react-native';
import { connect } from 'react-redux';
import MapView from '../components/mapView';
import setPoi from '../actions/action_set_poi';
import filterByTag from '../actions/action_filter_by_tags.js'

function mapStateToProps({ user, socket, allUsers, hotSpotVisibility }) {
  return { user, socket, allUsers, hotSpotVisibility };
}


export default connect(mapStateToProps, { setPoi })(MapView);






