import React, {
  Alert,
  TouchableHighlight,
  TextInput,
  View,
  Text,
  Component,
  StyleSheet
} from 'react-native';

const Button = (props)=> {
    return (
      <TouchableHighlight style={styles.button} onPress={props.clickAction}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#222',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#ccc'
  },
  buttonText: {
    fontSize: 20
  }
})

export default Button;
