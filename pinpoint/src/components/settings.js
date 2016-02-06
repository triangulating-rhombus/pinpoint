import React, { Component, View, TextInput, Text, Switch } from 'react-native';
import Button from './button';
import styles from '../styles/styles';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    const { tag1, tag2, tag3, isBroadcasting } = this.props.settings;
    this.state = {
      // Values displayed on form input elements
      // Intialized to values from setting store
      tempTag1: tag1 || '',
      tempTag2: tag2 || '',
      tempTag3: tag3 || '',
      tempIsBroadcasting: isBroadcasting || false,

      justSubmitted: false
    };
  }

  temporarilyShowSuccessMessage() {
    this.setState({ justSubmitted: true });
    setTimeout(() => {
      this.setState({ justSubmitted: false });
      this.props.navigator.immediatelyResetRouteStack([{ name: 'TabBar' }]);
    }, 1000);
  }

  onSubmit() {
    const settingsToSend = {
      tag1: this.state.tempTag1,
      tag2: this.state.tempTag2,
      tag3: this.state.tempTag3,
      isBroadcasting: this.state.tempIsBroadcasting
    };

    this.props.updateSettings(
      settingsToSend,
      this.props.user.token,
      () => this.temporarilyShowSuccessMessage()
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.formLabel}>Tags</Text>
        <TextInput 
          style={styles.inputStyle} 
          value={this.state.tempTag1}
          onChangeText={ tempTag1 => this.setState({ tempTag1 }) }
          placeholder="Enter first tag" 
        />

        <TextInput 
          style={styles.inputStyle} 
          value={this.state.tempTag2}
          onChangeText={ tempTag2 => this.setState({ tempTag2 }) }
          placeholder="Enter second tag (optional)" 
        />

        <TextInput 
          style={styles.inputStyle} 
          value={this.state.tempTag3}
          onChangeText={ tempTag3 => this.setState({ tempTag3 }) }
          placeholder="Enter third tag (optional)" 
        />

        <Text style={styles.formLabel}>Broadcast Location</Text>
        
        <Switch
          style={{marginBottom: 10}}
          value={this.state.tempIsBroadcasting}
          onValueChange={ tempIsBroadcasting => this.setState({ tempIsBroadcasting }) }
        />


        <Text style={styles.formLabel}>Showcase Hotspots</Text>

        <Switch
          onValueChange={(value) => this.props.toggleHotspot() }
          style={{marginBottom:10}}
          value={this.props.hotSpotVisibility}
        />

        <Button text="Update settings" clickAction={this.onSubmit.bind(this)} />
        <Text style={styles.success}>{ this.state.justSubmitted ? 'Saved successfully!' : '' }</Text>
      </View>
    );
  }
}
