const DEFAULT_TAG = 'Tennis';

import React, { Component, View, Text, StyleSheet } from 'react-native';
import RNChart from 'react-native-chart';
// import styles from '../styles/styles';

export default class Stats extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { latitude, longitude } = this.props.poi;
    this.props.getStats({ 
      lat: latitude,
      lon: longitude,
      tag: DEFAULT_TAG
    });
  }

  componentWillUpdate() {
    const { latitude, longitude } = this.props.poi;
    this.props.getStats({ 
      lat: latitude,
      lon: longitude,
      tag: DEFAULT_TAG
    });
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

  roundToNearestThousandth(float) {
    return Math.round(float * 1000) / 1000;
  }
  render() {
    const latitude = this.roundToNearestThousandth(this.props.poi.latitude);
    const longitude = this.roundToNearestThousandth(this.props.poi.longitude);

    // If address could not be resolved by server, response will be a string (rather than object)
    if (typeof this.props.stats === 'string') {
      return (
        <View style={styles.container}>
          <Text>{`Sorry! We could not resolve the address at ${latitude}, ${longitude}.`}</Text>
          <Text>Please try another location.</Text>
        </View>
      );
    } else if (Object.keys(this.props.stats).length === 0) {
      return (
        <View style={styles.container}>
          <Text>{`Loading stats for ${latitude}, ${longitude}...`}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.formLabel}>By Day</Text>
          <RNChart style={styles.chart}
            chartTitle={`Visits by ${DEFAULT_TAG} people @ (${latitude}, ${longitude})`}
            chartTitleColor='black'
            labelTextColor='black'
            labelFontSize={15}
            chartData={this.getChartData()}
            verticalGridStep={5}
            xLabels={xLabels}
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
    top: 70, 
    left: 4, 
    bottom: 70,
    right: 16,
  }
});

const xLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];