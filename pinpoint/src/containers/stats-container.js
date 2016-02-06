import { Component } from 'react-native';
import { connect } from 'react-redux';
import Stats from '../components/stats.js';

// Makes user state available to component
function mapStateToProps({ user, poi }) {
  return { user, poi };
}

export default connect(mapStateToProps)(Stats);