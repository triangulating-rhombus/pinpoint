import { SIGNUP_SUCCEEDED, SIGNUP_FAILED } from '../constants/actionTypes';

const SERVER_URL = 'http://localhost:3000/signup';

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
  // }).then(function(res){
  //   // console.log("Server response",res)
  // });
}

// Vanilla action creators
function signupSucceeded(userInfo) {
  return {
    type: SIGNUP_SUCCEEDED,
    payload: userInfo
  }
}
function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    payload: error
  }
}

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and then dispatch the appropriate vanilla action creator
export default function signupUser(user, successCallback) {
  return (dispatch) => {
    fetchUserData(user).then(
      response => {
        const body = JSON.parse(response._bodyText);
        if (response.status === 200) {
          const token = body.token;
          dispatch(signupSucceeded({ token, user: user.username }));
          successCallback();
        } else {
          const error = body.error;
          dispatch(signupFailed(error));
        }
      },
      error => {
        dispatch(signupFailed(error));
      }
    );
  }
}