import { LOGIN_SUCCEEDED, LOGIN_FAILED } from '../constants/actionTypes';

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
  }).then(function(res){
    console.log("Server response",res)
  });
}

// Vanilla action creators
function loginSucceeded(user) {
  return {
    type: LOGIN_SUCCEEDED,
    payload: user
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
export default function loginUser(user) {
 	return (dispatch) => {
 		fetchUserData(user).then(
      response => dispatch(loginSucceeded(user)),
      error => dispatch(loginFailed(error))
    );
 	}
}

