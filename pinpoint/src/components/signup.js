import React, { Component, View, Image, Text, TextInput } from 'react-native';
import styles from '../assets/styles/styles';
import Button from "./button.js";
import logo from '../assets/images/pinpointlogo.png'


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
      this.props.navigator,
      navigator
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
       <Image style={styles.backgroundImage} source={{uri:"http://i.imgur.com/1fyRRNK.jpg"}} resizeMode='cover'>
        <Image style={styles.logo} source={logo} resizeMode='contain'/>
        <View style={styles.textWrapper}>
        <View style={styles.border}>
        <TextInput 
          style={styles.inputStyle} 
          value={this.state.username}
          onChangeText={ username => this.setState({ username }) }
          placeholderTextColor="white"
          placeholder="username" 
        />
        </View>
        <View style={styles.border}>
        <TextInput 
          style={styles.inputStyle} 
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={ password => this.setState({ password }) }  
          placeholderTextColor="white"
          placeholder="password"
        />
        </View>
        <Text style={styles.formLabel}>{this.state.errorMessage}</Text>
        <Button text="Signup" clickAction={this.onSubmit.bind(this)} />

        <Button text="Back to Login" clickAction={this.backToLogin.bind(this)} />
        <Text style={styles.errorMessage}>{this.showError.call(this)}</Text>
      </View>
      </Image>
    );
  }
}

