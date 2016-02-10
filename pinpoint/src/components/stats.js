import React, { Component, View, Text, StyleSheet, Modal } from 'react-native';
import RNChart from 'react-native-chart';
// import styles from '../styles/styles';

import Button from './button';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animated: true,
      transparent: true
    }
  }

  // Returns this.props.stats.visitsByDay in format to be rendered by chart
  // this.props.stats.visitsByDay is an object returned by the server
  //   of the form: { Sun: 10, Mon: 14, ... }
  getChartData() {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const { visitsByDay } = this.props.stats;
    const values = dayNames.map(dayName => visitsByDay[dayName] || 0);
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

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  roundToNearestThousandth(float) {
    return Math.round(float * 1000) / 1000;
  }

  renderContent() {
    const { explanation } = this.props.stats;
    if (explanation) {
      return (<Text>{explanation}</Text>);
    } else {
      const { latitude, longitude } = this.props.stats.poi;
      return (
          <RNChart
            style={styles.chart}
            // chartTitle={`Tag: ${tag}\n${address}`}
            // chartTitleColor='black'
            labelTextColor='black'
            labelFontSize={12}
            chartData={this.getChartData()}
            verticalGridStep={1} // number of grids y axis is cut into
            xLabels={xLabels}
          />
      );
    }
  }
  render() {
    const latitude = this.roundToNearestThousandth(this.props.stats.poi.latitude);
    const longitude = this.roundToNearestThousandth(this.props.stats.poi.longitude);
    const tag = this.props.tag || 'any';
    const address = this.props.stats.address || 'Unknown Address';
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;

    return (
      <Modal
        animated={this.state.animated}
        transparent={this.state.transparent}
        visible={this.props.stats.isVisible}>
        <View style={[modalStyles.container, modalBackgroundStyle]}>
          <View style={[modalStyles.innerContainer, innerContainerTransparentStyle]}>
            <Button
              clickAction={() => this.props.hideStats()}
              style={modalStyles.modalButton}
              text='Back to Map'
            />
            <Text>{`Tag: ${tag}\n${address}`}</Text>
            {this.renderContent()}
          </View>
        </View>
      </Modal>
    );
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
    top: 100, 
    left: 4, 
    bottom: 30,
    right: 16,
  }
});

const xLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


var modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    height: 500
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});