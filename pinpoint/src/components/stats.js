const lat = 37.331177;
const lon = -122.031641;
const tag = 'Tennis';

import React, { Component, View, Text, StyleSheet } from 'react-native';
import RNChart from 'react-native-chart';
// import styles from '../styles/styles';

export default class Stats extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getStats({ lat, lon, tag });
  }

  // Returns this.props.stats in format to be rendered by chart
  // this.props.stats is an object returned by the server
  //   of the form: { Sun: 10, Mon: 14, ... }
  getChartData() {
    const dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const values = dayNames.map(dayName => this.props.stats[dayName]);
    return [
      {
        name: 'BarChart',
        type: 'bar',
        color: '#3369e8',
        widthPercent: 0.8,
        data: values
      }
    ];
  }

  render() {
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
          <RNChart style={styles.chart}
            chartData={this.getChartData()}
            verticalGridStep={5}
            xLabels={xLabels}
            xAxisTitle='Days of Week'
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chart: {
    position: 'absolute', 
    top: 16, 
    left: 4, 
    bottom: 30,
    right: 16,
  }
});

const xLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];