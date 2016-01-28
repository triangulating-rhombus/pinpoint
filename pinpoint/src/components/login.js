import React, {
  Alert,
  TouchableHighlight,
  TextInput,
  View,
  Text,
  Component,
  StyleSheet
} from 'react-native';

import Button from "./button.js";

export const Login = (props) => {

  // MVP: TODO:Create a store for this
  var user = {
    username: '',
    password: ''    
  }
  // Will pass the user object to checkUser 
  const submitUser = () => {
    Alert.alert(`Username: ${user.username} Password ${user.password}`);
    props.checkUser(user);
    props.navigator.push({id:'MapView'});
  }

  //This is test to ensure that the data is coming full circle from the store 
  const test = () => {
    if(!props.userProfile.username){
      return "Please Sign In"
    } else {
      console.log("Login props:", props)
      return `Hello ${props.userProfile.username}`
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.formLabel}>Username</Text>
      <TextInput 
        style={styles.inputStyle} 
        onChangeText={ (text) => user.username = text } 
        placeholder="Enter your username" 
      />

      <Text style={styles.formLabel}>Password:</Text>
      <TextInput 
        style={styles.inputStyle} 
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={ (text) => user.password = text }  
      />
      <Button text='Login' clickAction={submitUser} />


      <Text>{test.call(this)}</Text> 

    </View>
  )
}

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

