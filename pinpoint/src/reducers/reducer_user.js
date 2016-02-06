import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER } from '../constants/actionTypes';
import loginUser from '../actions/action_login_user';

const INITIAL_STATE = {
  username: null,
  token: null,
  error: null
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case SIGNUP_USER:
      console.log(action);
      return action.payload;
    case LOGIN_USER:
      console.log(action);
      return action.payload;
    default:
      return state;
  }
}


