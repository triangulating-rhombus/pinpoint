import { GET_SETTINGS } from '../constants/actionTypes';

const SERVER_URL = 'http://localhost:3000/settings';

// Move this function to utils later
function fetchSettings(token) {
  // fetch is React Native's built-in function to make AJAX requests
  return fetch(SERVER_URL, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  });
}

// Vanilla action creators
function getSettings(settings) {
  return {
    type: GET_SETTINGS,
    payload: settings
  }
}

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and then dispatch the appropriate vanilla action creator
export default function requestSettings(token, successCallback) {
  return (dispatch) => {
    fetchSettings(token)
    .then(
      response => {
        const body = JSON.parse(response._bodyText);
        if (response.status === 200) {
          dispatch(getSettings(body));
          successCallback();
        }
      },
      error => {
        callback();
      }
    );
  }
}