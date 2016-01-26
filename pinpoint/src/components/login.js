import React, {
  Alert,
  TouchableHighlight,
  TextInput,
  View,
  Text,
  Component,
  StyleSheet
} from 'react-native';

class Login extends Component  {
  constructor(){
    super()
    this.state = {
      username:'',
      password:''
    };
  }
  onPress(){
    // Alert.alert(this)
    Alert.alert(`Username: ${this.state.username} Password ${this.state.password}`);
  }

  render(){
    return (
      <View>
        <TextInput 
          style={styles.inputStyle} 
          onChangeText={ (text) => this.setState({username:text}) } 
          placeholder="Enter your username" 
        />

        <TextInput 
          style={styles.inputStyle} 
          placeholder="Enter your password"
          onChangeText={ (text) => this.setState({password:text}) }  
        />
        <TouchableHighlight onPress={this.onPress.bind(this)} >
          <Text>Submit</Text>
        </TouchableHighlight> 

      </View>
    );
  }

};


const styles = StyleSheet.create({
  inputStyle:{
    height:40,
    borderColor: 'gray',
    marginBottom:10,
    borderWidth:1,
    width:300
  }
});

export default Login;
