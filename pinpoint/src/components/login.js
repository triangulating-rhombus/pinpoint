import React, {
  TouchableHighlight,
  TextInput,
  View,
  Text,
  Component,
} from 'react-native';

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
      // send this socket variable to a store
      // create an action
      // send it to a reducer
      this.props.addSocket();

      console.log('socket found in store',this.props.socket);
    }

    if (user.shouldRedirect) {
      this.props.navigator.push({ id: 'MapView' });
    }
  }

  // Passes username and password to loginUser 
  onSubmit() {
    this.props.loginUser(
      {
        username: this.state.username,
        password: this.state.password
      },
    );
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
    if (this.props.user.error) { 
      return "Invalid user";
    } else {
      return "";
    }
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