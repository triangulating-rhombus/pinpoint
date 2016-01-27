import { combineReducers } from 'redux';
import  LoginUser  from './loginUserReducer';

const rootReducer = combineReducers({
  userProfile: LoginUser
});

export default rootReducer;
