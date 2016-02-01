import React, { Component, View, Text, TextInput } from 'react-native';
import styles from '../styles/styles';
import Button from "./button.js";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  componentDidUpdate() {
    const { user, socket } = this.props;

    if(user.loggedIn && !socket) {
      this.props.addSocket();
    }

    if (user.shouldRedirect && !socket) {
    
      this.props.navigator.push({ id: 'MapView' });
    }
  }

  // Passes username and password to loginUser 
  onSubmit() {
    const { username, password } = this.state;
    this.props.loginUser({ username, password });
  }

  redirectToSignup() {
    this.props.navigator.push({ id: 'Signup' });
  }

  //This is test to ensure that the data is coming full circle from the store 
  test() {
    const { user } = this.props;
    if (user.username) {
      console.log("Login props:", this.props);
      return `Hello ${user.username}`;
    } else {
      return "Please Sign In"
    }
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
        <Button text="Signup" clickAction={this.redirectToSignup.bind(this)} />

        {/*<Text>{this.test.call(this)}</Text> */}
        <Text>{this.showError.call(this)}</Text>
      </View>
    );
  }
}
