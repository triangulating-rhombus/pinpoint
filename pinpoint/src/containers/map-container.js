import { Component } from 'react-native';
import { connect } from 'react-redux';
import MapView from '../components/mapView';
import setPoi from '../actions/action_set_poi';
import updateAction from '../actions/action_update_geolocation.js';

// This action is fired by the map component to update the store with new filter tag
import toggleTag from '../actions/action_filter_tag_name.js';

function mapStateToProps({ user, socket, allUsers, hotSpotVisibility, currentTagLabel, me, hotSpotPins  }) {
  return { user, socket, allUsers, hotSpotVisibility, currentTagLabel, me, hotSpotPins   };
}

export default connect(mapStateToProps, {setPoi, toggleTag })(MapView);






