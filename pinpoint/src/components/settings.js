import React, { Component, View, TextInput, Text, Switch } from 'react-native';
import Button from './button';
import styles from '../styles/styles';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tag1: '',
      tag2: '',
      tag3: '',
      isBroadcasting: false,
    };
  }

  componentWillMount() {
    this.props.getSettings(this.props.user.token, () => this.setState(this.props.settings));
  }

  onSubmit() {
    this.props.updateSettings(
      this.state, 
      this.props.user.token,
      this.props.navigator
      // () => {console.log('this:', this.props.navigator); this.props.navigator.push({ id: 'MapView' })}
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.formLabel}>Tags</Text>
        <TextInput 
          style={styles.inputStyle} 
          value={this.state.tag1}
          onChangeText={ tag1 => this.setState({ tag1 }) }
          placeholder="Enter first tag" 
        />

        <TextInput 
          style={styles.inputStyle} 
          value={this.state.tag2}
          onChangeText={ tag2 => this.setState({ tag2 }) }
          placeholder="Enter second tag (optional)" 
        />

        <TextInput 
          style={styles.inputStyle} 
          value={this.state.tag3}
          onChangeText={ tag3 => this.setState({ tag3 }) }
          placeholder="Enter third tag (optional)" 
        />

        <Text style={styles.formLabel}>Broadcast Location</Text>
        
        <Switch
          onValueChange={(value) => this.setState({ isBroadcasting: value})}
          style={{marginBottom: 10}}
          value={this.state.isBroadcasting}
        />


        <Text style={styles.formLabel}>Showcase Hotspots</Text>

        <Switch
          onValueChange={(value) => this.props.toggleHotspot() }
          style={{marginBottom:10}}
          value={this.state.renderHotspot}
        />

        <Button text="Update settings" clickAction={this.onSubmit.bind(this)} />
      </View>
    );
  }
}
