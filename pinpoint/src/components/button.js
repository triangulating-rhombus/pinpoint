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
        <Text>{props.text}</Text>
      </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
  button: {
    borderColor: 'red',
    borderRadius: 10
  }
})

export default Button;
