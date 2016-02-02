import { Component } from 'react-native';
import { connect } from 'react-redux';
import updateSettings from '../actions/action_submit_settings';
import Settings from '../components/settings.js';

// Makes user state available to component
function mapStateToProps({ settings }) {
  return { settings };
}

export default connect(mapStateToProps, { updateSettings })(Settings);





