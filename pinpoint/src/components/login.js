import React, {
  Alert,
  TouchableHighlight,
  TextInput,
  View,
  Text,
  Component,
  StyleSheet
} from 'react-native';

export default class Login extends Component  {
  constructor(props){
    super(props)
    this.state = {
      username:'',
      password:''
    };
  }
  submitUser(){
      
    Alert.alert(`Username: ${this.state.username} Password ${this.state.password}`);
    this.props.checkUser(this.state);
  }

  test(){
    console.log('testing login view',this.props);
    if(!this.props.userProfile.username){
      return "Please Sign In"
    } else {
      return `Hello ${this.props.userProfile.username}`
    }
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
        <TouchableHighlight onPress={this.submitUser.bind(this)} >
          <Text>Submit</Text>
        </TouchableHighlight>


        <Text>{this.test.call(this)}</Text> 

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

