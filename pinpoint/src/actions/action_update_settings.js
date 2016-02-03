import { UPDATE_SETTINGS } from '../constants/actionTypes';

const SERVER_URL = 'http://localhost:3000/settings';

// Move this function to utils later
function postSettings(settings) {
  // fetch is React Native's built-in function to make AJAX requests
  return fetch(SERVER_URL, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  });
}

// Vanilla action creators
function updateSettings(settings) {
  return {
    type: UPDATE_SETTINGS,
    payload: settings
  }
}

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and then dispatch the appropriate vanilla action creator
export default function submitSettings(settings, successCallback) {
  return (dispatch) => {
    postSettings(settings).then(
      response => {
        successCallback(); // temporarily up here since next line will fail without successful server response
        const body = JSON.parse(response._bodyText);
        if (response.status === 200) {
          const token = body.token;
          dispatch(updateSettings({ settings }));
        }
      },
      error => {
        callback();
      }
    );
  }
}