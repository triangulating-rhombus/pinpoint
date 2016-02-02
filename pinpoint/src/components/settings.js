import React, { Component, View, TextInput, Text, Switch } from 'react-native';
import Button from './button';
import styles from '../styles/styles';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: '',
      isBroadcasting: false
    };
  }

  onSubmit() {

  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.formLabel}>Tags</Text>
          <TextInput 
            style={styles.inputStyle} 
            value={this.state.tags}
            onChangeText={ tags => this.setState({ tags }) }
            placeholder="Enter tags" 
          />


        <Text style={styles.formLabel}>Broadcast Location</Text>
        <Switch
          onValueChange={(value) => this.setState({isBroadcasting: value})}
          style={{marginBottom: 10}}
          value={this.state.isBroadcasting}
        />

        <Button text="Update settings" clickAction={this.onSubmit.bind(this)} />
      </View>
    );
  }
}