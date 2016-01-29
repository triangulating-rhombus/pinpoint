import React, {
  TouchableHighlight,
  TextInput,
  View,
  Text,
  Component,
  StyleSheet
} from 'react-native';

import Socket from '../socket/socket.js';
import Store from '../../index.ios';

import Button from "./button.js";

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center'
  },
  inputStyle:{
    height:40,
    padding:5,
    borderRadius:5,
    borderColor: 'gray',
    marginBottom:10,
    borderWidth:1,
    width:300
  },
  formLabel:{
    fontSize:20
  }
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  componentDidUpdate() {
    const { user } = this.props;
    console.log("component received new props:", user);

    if (user.loggedIn) {
      Socket(Store); // initialize socket connection to server
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


        <Text>{this.test.call(this)}</Text> 

      </View>
    );
  }
}

