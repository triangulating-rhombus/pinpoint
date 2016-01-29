import React, {
  TouchableHighlight,
  TextInput,
  View,
  Text,
  Component,
  StyleSheet
} from 'react-native';

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

  // Passes username and password to loginUser 
  submitUser() {
    this.props.loginUser(
      {
        username: this.state.username,
        password: this.state.password
      },
      this.props.navigator
    );
  }

  //This is test to ensure that the data is coming full circle from the store 
  test() {
    if(!this.props.user.username){
      return "Please Sign In"
    } else {
      console.log("Login props:", this.props)
      return `Hello ${this.props.user.username}`
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

        <Button text="Login" clickAction={this.submitUser.bind(this)} />


        <Text>{this.test.call(this)}</Text> 

      </View>
    );
  }
}

