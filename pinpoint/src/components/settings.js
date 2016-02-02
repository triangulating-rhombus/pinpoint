import React, { Component, View, TextInput, Text } from 'react-native';
import Button from './button';
import styles from '../styles/styles';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = { tags: '' };
  }

  onSubmit() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is Settings view</Text>
        <Text style={styles.formLabel}>Tags</Text>
          <TextInput 
            style={styles.inputStyle} 
            value={this.state.tags}
            onChangeText={ tags => this.setState({ tags }) }
            placeholder="Enter tags" 
          />

          <Button text="Update settings" clickAction={this.onSubmit.bind(this)} />
      </View>
    );
  }
}