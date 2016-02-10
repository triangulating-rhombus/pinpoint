import React, { Component, View, Text, StyleSheet } from 'react-native';
import RNChart from 'react-native-chart';
// import styles from '../styles/styles';

export default class Stats extends Component {
  // Returns this.props.poi.stats in format to be rendered by chart
  // this.props.poi.stats is an object returned by the server
  //   of the form: { Sun: 10, Mon: 14, ... }
  getChartData() {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const values = dayNames.map(dayName => this.props.poi.stats[dayName] || 0);
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
    const { error, warning, friendlyExplanation } = this.props.poi.stats;
    if (error || warning) {
      return (
        <View style={styles.container}>
          <Text>{friendlyExplanation}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.formLabel}>By Day</Text>
          <RNChart style={styles.chart}
            chartTitle={`Visits by ${this.props.settings.tag1} people @ (${latitude}, ${longitude})`}
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