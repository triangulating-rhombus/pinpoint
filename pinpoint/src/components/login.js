import React, { Component, View, Text, TextInput } from 'react-native';
import styles from '../styles/styles';
import Button from "./button.js";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  onSubmit() {
    const { username, password } = this.state;
    this.props.loginUser(
      { username, password },
      () => this.props.addSocket(() => this.props.navigator.push({ id: 'Settings' }))
    );
  }

  redirectTo(viewId) {
    this.props.navigator.push({ id: viewId });
  }

  showError() {
    return this.props.user.error || '';
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

        <Button text="Login" clickAction={this.onSubmit.bind(this)} />
        <Text style={styles.buttonLabel}>Don't have an account?</Text>
        <Button text="Signup" clickAction={() => this.redirectTo('Signup') } />

        <Text>{this.showError.call(this)}</Text>
      </View>
    );
  }
}