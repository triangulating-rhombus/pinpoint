import { LOGIN_SUCCEEDED, LOGIN_FAILED } from '../constants/actionTypes';

const SERVER_URL = 'http://10.8.32.166:3000/login';

// POST username/password to server to request authentication
// On response, initialize socket connection to server

// Move this function to utils later
function fetchUserData(user) {
  // fetch is React Native's built-in function to make AJAX requests
  return fetch(SERVER_URL, { 
  	method: 'POST',
  	headers: { 'Content-Type': 'application/json' },
  	body: JSON.stringify(user)
  });
}

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
export default function loginUser(user, successCallback) {
 	return (dispatch) => {
 		fetchUserData(user).then(
      response => {
        const body = JSON.parse(response._bodyText);
        if (response.status === 200) {
          const token = body.token;
          dispatch(loginSucceeded({ token, user: user.username }));
          successCallback();
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
