import { Component } from 'react-native';
import { connect } from 'react-redux';
import getSettings from '../actions/action_get_settings';
import updateSettings from '../actions/action_update_settings';
import Settings from '../components/settings.js';
import toggleHotspot from '../actions/action_toggle_hotspots.js';
import logoutAction from '../actions/action_logout_user';
import updateHotspots from '../actions/action_update_hotspots';

// Makes user state available to component
function mapStateToProps({ user, settings, hotSpotVisibility, tag }) {
  return { user, settings, hotSpotVisibility, tag };
}

export default connect(mapStateToProps, { getSettings, updateSettings, toggleHotspot, logoutAction, updateHotspots })(Settings);
