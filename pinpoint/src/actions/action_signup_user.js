import { SIGNUP_USER } from '../constants/actionTypes';
import { sendRequest } from './utils';

// POST username/password to server to request authentication
// On response, initialize socket connection to server

// Vanilla action creator
function signupUser(userInfo) {
  return {
    type: SIGNUP_USER,
    payload: userInfo
  }
}

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and then dispatch the appropriate vanilla action creator
export default (user, successCallback, navigator) => {
  return (dispatch) => {
    sendRequest('POST', '/signup', user)
    .then(
      response => {
        const body = JSON.parse(response._bodyText);
        if (response.status === 200) {
          body.username = user.username;
          successCallback();
          navigator.immediatelyResetRouteStack([{ name: 'Settings' }]);
        }
        dispatch(signupUser(body));
      },
      error => {
        const body = JSON.parse(response._bodyText);
        dispatch(signupUser(body));
      }
    );
  }
}
