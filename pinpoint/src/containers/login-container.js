import Login from '../components/login.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import checkUser from '../actions/checkUserAction';

function mapDispatchToProps(dispatch){
  return bindActionCreators({ checkUser }, dispatch);
}

function mapStateToProps(state) {
  // Whatever gets returned from here will show up as props from BookList
  return {
    userProfile: state.userProfile
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);




