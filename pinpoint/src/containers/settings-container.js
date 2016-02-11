import { Component } from 'react-native';
import { connect } from 'react-redux';
import getSettings from '../actions/action_get_settings';
import updateSettings from '../actions/action_update_settings';
import Settings from '../components/settings.js';
import showHotspots from '../actions/action_show_hotspots.js';
import hideHotspots from '../actions/action_hide_hotspots.js';
import logoutAction from '../actions/action_logout_user';
import updateHotspots from '../actions/action_update_hotspots';

// Makes user state available to component
function mapStateToProps({ user, settings, hotspots, tag }) {
  return { user, settings, hotspots, tag };
}

export default connect(mapStateToProps, { getSettings, updateSettings, showHotspots, hideHotspots, logoutAction, updateHotspots })(Settings);
