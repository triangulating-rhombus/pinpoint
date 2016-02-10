import { Component } from 'react-native';
import { connect } from 'react-redux';
import Stats from '../components/stats.js';

// Makes user state available to component
function mapStateToProps({ user, poi, settings }) {
  return { user, poi, settings };
}

export default connect(mapStateToProps)(Stats);