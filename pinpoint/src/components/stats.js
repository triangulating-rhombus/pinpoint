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
    bottom: 4,
    right: 16,
  }
});

// const chartData = [
//   {
//     name: 'BarChart',
//     type: 'bar',
//     color:'purple',
//     widthPercent: 0.6,
//     data: [30, 1, 1, 2, 3, 5, 21, 13, 21, 34, 55, 30],
//   }
// ];

// const xLabels = ['0','1','2','3','4','5','6','7','8','9','10','11'];

// export default class Stats extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>HELLO</Text>
//         <RNChart style={styles.chart}
//           chartData={chartData}
//           verticalGridStep={5}
//           xLabels={xLabels}
//          />
//       </View>
//     );
//   }
// }