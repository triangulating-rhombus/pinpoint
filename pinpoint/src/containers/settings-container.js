import { Component } from 'react-native';
import { connect } from 'react-redux';
import getSettings from '../actions/action_get_settings';
import updateSettings from '../actions/action_update_settings';
import Settings from '../components/settings.js';
import toggleHotspot from '../actions/action_toggle_hotspots.js';

// Makes user state available to component
function mapStateToProps({ user, settings, hotSpotVisibility }) {
  return { user, settings, hotSpotVisibility };
}

export default connect(mapStateToProps, { getSettings, updateSettings, toggleHotspot })(Settings);
