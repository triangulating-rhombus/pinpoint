import { Component } from 'react-native';
import { connect } from 'react-redux';
import getSettings from '../actions/action_get_settings';
import updateSettings from '../actions/action_update_settings';
import Settings from '../components/settings.js';

// Makes user state available to component
function mapStateToProps({ user, settings }) {
  return { user, settings };
}

export default connect(mapStateToProps, { getSettings, updateSettings })(Settings);