import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // vertical align
    alignItems: 'center' // horizontal align
  },
  inputStyle: {
    height: 40,
    padding: 5,
    borderRadius: 5,
    borderColor: 'gray',
    marginLeft: 60, // hacky temporary fix, will not scale
    marginBottom: 10,
    borderWidth: 1,
    width: 300
  },
  formLabel: {
    fontSize: 20
  },
  buttonLabel: {
    marginTop: 40,
    fontSize: 25
  },
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
});