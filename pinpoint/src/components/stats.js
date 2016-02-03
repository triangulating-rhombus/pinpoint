import React, { Component, View, Text } from 'react-native';
import styles from '../styles/styles';

export default class Stats extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getStats();
  }

  render() {
    console.log("rendering via:", this.props.stats);
    if (Object.keys(this.props.stats).length === 0) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.formLabel}>By Day</Text>
          <Text></Text>
        </View>
      );
    }
  }
}