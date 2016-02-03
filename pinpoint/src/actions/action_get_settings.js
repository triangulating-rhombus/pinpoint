import { GET_SETTINGS } from '../constants/actionTypes';

const SERVER_URL = 'http://localhost:3000/settings';

// Move this function to utils later
function fetchSettings(settings, token) {
  // fetch is React Native's built-in function to make AJAX requests
  return fetch(SERVER_URL, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(settings)
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
export default function requestSettings(settings, token, successCallback) {
  return (dispatch) => {
    fetchSettings(settings, token)
    .then(
      response => {
        successCallback(); // temporarily up here since next line will fail without successful server response
        const body = JSON.parse(response._bodyText);
        if (response.status === 200) {
          dispatch(getSettings({ body }));
          successCallback();
        }
      },
      error => {
        callback();
      }
    );
  }
}