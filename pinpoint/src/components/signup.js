import React, { Component, View, Text, TextInput } from 'react-native';
import styles from '../styles/styles';
import Button from "./button.js";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };
  }

  onSubmit() {
    const { username, password } = this.state;
    this.props.signupUser(
      { username, password },
      this.props.navigator
    );
  }

  showError() {
    return this.props.user.error || '';
  }

  backToLogin() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.formLabel}>Username</Text>
        <TextInput 
          style={styles.inputStyle} 
          value={this.state.username}
          onChangeText={ username => this.setState({ username }) }
          placeholder="Enter your username" 
        />

        <Text style={styles.formLabel}>Password:</Text>
        <TextInput 
          style={styles.inputStyle} 
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={ password => this.setState({ password }) }  
          placeholder="Enter your password"
        />

        <Text style={styles.formLabel}>{this.state.errorMessage}</Text>
        <Button text="Signup" clickAction={this.onSubmit.bind(this)} />

        <Text>{this.showError.call(this)}</Text>
        <Button text="Back to Login" clickAction={this.backToLogin.bind(this)} />
      </View>
    );
  }
}

