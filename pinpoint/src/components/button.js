import React, {
  Alert,
  TouchableHighlight,
  TextInput,
  View,
  Text,
  Component,
} from 'react-native';

import styles from '../assets/styles/styles';

const Button = (props)=> {
    return (
      <TouchableHighlight style={styles.button} onPress={props.clickAction}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableHighlight>
    );
}

export default Button;
