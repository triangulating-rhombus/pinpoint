import { Component } from 'react-native';
import { connect } from 'react-redux';
import getStats from '../actions/action_get_stats';
import Stats from '../components/stats.js';

// Makes user state available to component
function mapStateToProps({ user, stats, poi }) {
  return { user, stats, poi };
}

export default connect(mapStateToProps, { getStats })(Stats);