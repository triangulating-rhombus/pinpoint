import React, { Component, View, Text, TextInput, Image } from 'react-native';
import styles from '../styles/styles';
import Button from "./button.js";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  onSubmit() {
    // this.props.navigator.push({ id: 'Settings' });
    const { username, password } = this.state;
    this.props.loginUser(
      { username, password },
      this.props.navigator,
      navigator
    );
  }

  redirectTo(routeName) {
    this.props.navigator.push({ name: routeName });
  }

  showError() {
    return this.props.user.error || '';
  }

  render() {
    return (
      <Image style={styles.container} source={{uri:'http://images7.alphacoders.com/361/361917.jpg'}} >
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

        <Button text="Login" clickAction={this.onSubmit.bind(this)} />
        <Text style={styles.buttonLabel}>Don't have an account?</Text>
        <Button text="Signup" clickAction={() => this.redirectTo('Signup') } />

        <Text>{this.showError.call(this)}</Text>
      </Image>
    );
  }
}
