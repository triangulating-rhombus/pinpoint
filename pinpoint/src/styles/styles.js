import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  basicContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center', // vertical align
    alignItems: 'center', // horizontal align
    backgroundColor: 'white'
  },
  inputStyle: {
    height: 40,
    padding: 5,
    borderRadius: 5,
    borderColor: 'gray',
    alignSelf: 'center',
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
  },
  map: {
    flex: 1,
    justifyContent: 'center', // vertical align
    height: 100 // horizontal align
  },
  success: {
    marginTop: 10,
    backgroundColor: '#dff0d8'
  }
});
