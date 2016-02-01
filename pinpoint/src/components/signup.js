import React, { Component, View, Text, TextInput } from 'react-native';
import styles from '../styles/styles';
import Button from "./button.js";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  // Passes username and password to signupUser 
  onSubmit() {
    const { username, password } = this.state;
    this.props.signupUser({ username, password });
  }

  //This is test to ensure that the data is coming full circle from the store 
  test() {
    const { user } = this.props;
    if (user.username) {
      console.log("Signup props:", this.props);
      return `Hello ${user.username}`;
    } else {
      return "Please Sign In"
    }
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

        <Button text="Signup" clickAction={this.onSubmit.bind(this)} />

        {/*<Text style={styles.buttonLabel}>{this.test.call(this)}</Text> */}
        
        <Text>{this.showError.call(this)}</Text>
        <Button text="Back to Login" clickAction={this.backToLogin.bind(this)} />
      </View>
    );
  }
}

