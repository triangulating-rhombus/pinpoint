import { LOGIN_USER } from '../constants/actionTypes';
import loginUser from '../actions/action_login_user';

export default function (state = {}, action) {
  switch(action.type) {
    case LOGIN_USER:
      return action.payload;
    default:
      return state;
  }
}





