import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  basicContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center', // vertical align
    alignItems: 'center', // horizontal align
    backgroundColor: '#222'
  },
  logo:{
    width:150,
    height:150
  },

  inputStyle: {
    height: 40,
    padding: 10,
    alignSelf: 'center',
    marginBottom: 5,
    width: 300,
    color: 'white',
    borderTopColor: '#fff',
    borderWidth:1,
    borderTopWidth:1,
  },
  formLabel: {
    fontSize: 20,
    color:'white',
    marginBottom:5
  },
  buttonLabel: {
    marginTop: 40,
    fontSize: 25,
    color:'white',
    opacity:.9
  },
  button: {
    padding:12,
    backgroundColor: '#00B0F2',
    flexWrap:'wrap',
    alignSelf:'center',
    width:500,
    height:50,
    marginBottom:10
  },
  buttonText: {
    fontSize: 20,
    alignSelf:'center',
    color:'white',
    opacity:.9
  },
  map: {
    flex: 1,
    justifyContent: 'center', // vertical align
    height: 100 // horizontal align
  },
  success: {
    marginTop: 10,
    backgroundColor: '#dff0d8'
  },
  errorMessage: {
    marginTop:5,
    color:'red'
  }
});
