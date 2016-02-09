import React, { Component, View, Text, TextInput, Image } from 'react-native';
import styles from '../styles/styles';
import Button from "./button.js";
import logo from '../assets/images/pinpointlogo.png'

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
      this.props.navigator, // this is the app navigator that switches between views
      navigator, // this is the geoNavigator, which provides GPS data
      this.props.currentTagLabel
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

      <View style={styles.container}>
        <Image style={styles.logo} source={logo} resizeMode='contain'/>
        

        <TextInput 
          style={styles.inputStyle} 
          value={this.state.username}
          onChangeText={ username => this.setState({ username }) }
          placeholderTextColor="white"
          placeholder="username" 
        />
        
        <TextInput 
          style={styles.inputStyle} 
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={ password => this.setState({ password }) }  
          placeholderTextColor="white"
          placeholder="password"
        />

        <Button text="Login" clickAction={this.onSubmit.bind(this)} />
        <Text style={styles.buttonLabel}>Don't have an account?</Text>
        <Button text="Signup" clickAction={() => this.redirectTo('Signup') } />

        <Text style={styles.errorMessage}>{this.showError.call(this)}</Text>
      </View>
    );
  }
}
