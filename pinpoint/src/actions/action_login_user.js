import { LOGIN_SUCCEEDED, LOGIN_FAILED } from '../constants/actionTypes';
import sendRequest from './utils';

// POST username/password to server to request authentication
// On response, initialize socket connection to server

// Vanilla action creators
function loginSucceeded(userInfo) {
  return {
    type: LOGIN_SUCCEEDED,
    payload: userInfo
  }
}

function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    payload: error
  }
}

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and then dispatch the appropriate vanilla action creator
export default function loginUser(user, successCallback, navigator) {
 	return (dispatch) => {
 		sendRequest('POST', '/login', user)
    .then(
      response => {
        const body = JSON.parse(response._bodyText);
        if (response.status === 200) {
          const token = body.token;
          dispatch(loginSucceeded({ token, user: user.username }));
          successCallback();
          navigator.immediatelyResetRouteStack([{ name: 'TabBar' }]);
        } else {
          const error = body.error;
          dispatch(loginFailed(error));
        }
      },
      error => {
        dispatch(loginFailed(error));
      }
    );
 	}
}
