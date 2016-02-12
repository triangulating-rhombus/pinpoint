import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER, CLEAR_USER_ERROR } from '../actions/constants';

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
    case CLEAR_USER_ERROR:
      return { ...state, error: null }
    default:
      return state;
  }
}