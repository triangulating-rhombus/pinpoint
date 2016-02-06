import { Component } from 'react-native';
import { connect } from 'react-redux';
import MapView from '../components/mapView';
import setPoi from '../actions/action_set_poi';
import updateAction from '../actions/action_update_geolocation.js';

// This action will fire off a AJAX to the server to get the tags 
//import fetchTag from '../actions/action_filter_by_tags.js';
// This action is fired by the map component to update the store with new filter tag
import toggleTag from '../actions/action_filter_tag_name.js';


function mapStateToProps({ user, socket, allUsers, hotSpotVisibility, currentTagLabel, me }) {
  return { user, socket, allUsers, hotSpotVisibility, currentTagLabel, me };
}

export default connect(mapStateToProps, {setPoi, toggleTag, updateAction})(MapView);






