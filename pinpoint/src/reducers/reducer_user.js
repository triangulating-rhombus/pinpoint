import {
  SIGNUP_SUCCEEDED, SIGNUP_FAILED,
  LOGIN_SUCCEEDED, LOGIN_FAILED, LOGOUT_USER
} from '../constants/actionTypes';
import loginUser from '../actions/action_login_user';

const INITIAL_STATE = {
  loggedIn: false,
  shouldRedirect: false,
  username: null,
  token: null,
  error: null
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case SIGNUP_SUCCEEDED:
      return {
        ...state,
        loggedIn: true,
        shouldRedirect: true,
        username: action.payload.username,
        token: action.payload.token
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        loggedIn: false,
        shouldRedirect: false,
        error: action.payload
      };
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        loggedIn: true,
        shouldRedirect: true,
        username: action.payload.username,
        token: action.payload.token
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loggedIn: false,
        shouldRedirect: false,
        error: action.payload
      };
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}


