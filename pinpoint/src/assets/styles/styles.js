import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  basicContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center', // vertical align
    alignItems: 'center', // horizontal align
    backgroundColor: 'black',
    opacity:.6
  },
   formContainer: {
    flex: 1,
    justifyContent: 'center', // vertical align
    alignItems: 'center', // horizontal align
    backgroundColor:'#EEE'
  },
  logo:{
    width:150,
    height:150,
  },
  transparent:{
    backgroundColor:'black',
    opacity:.7,
    flex:1,
    height:100
  },
  textWrapper: {
    marginTop:60
  },
  inputStyle: {
    height: 30,
    padding: 4,
    alignSelf: 'center',
    marginBottom: 7,
    width: 300,
    color: 'white',
  },
  settingsInput: {
    height: 40,
    padding: 6,
    paddingLeft:10,
    alignSelf: 'center',
    marginBottom: 14,
    width: 300,
    color: 'black',
    borderColor:'black',
    borderRadius:5,
    borderWidth:1.5,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center', // vertical align
    alignItems: 'center', // horizontal align
   // opacity:.6
  },
  border: {
    borderBottomWidth:1,
    borderColor:'#fff',
    marginBottom:5
  },
  formLabel: {
    fontSize: 20,
    color:'black',
    marginBottom:5
  },
  buttonLabel: {
    marginTop: 30,
    marginBottom:15,
    fontSize: 17,
    color:'white',
    alignSelf:'center'
  },
  formButton: {
    width:600
  },
  button: {
    padding:6,
    backgroundColor: '#00B0F2',
    flexWrap:'wrap',
    alignSelf:'center',
    width:225,
    marginBottom:10,
    borderRadius:5
  },

  loginButtons: {
    marginTop:30
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
    color:'white'
  },

  // TabBar
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  }
});
