import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER } from '../actions/constants';

const INITIAL_STATE = {
  username: null,
  token: null,
  error: null
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case SIGNUP_USER:
      return action.payload;
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}