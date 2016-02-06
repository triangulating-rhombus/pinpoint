import { UPDATE_SETTINGS } from '../constants/actionTypes';

const SERVER_URL = 'http://localhost:3000/settings';

// Move this function to utils later
function postSettings(settings, token) {
  // fetch is React Native's built-in function to make AJAX requests
  return fetch(SERVER_URL, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
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
export default function submitSettings(settings, token, navigator) {
  return (dispatch) => {
    postSettings(settings, token)
    .then(
      response => {
        navigator.immediatelyResetRouteStack([{ name: 'TabBar' }]);
        const body = JSON.parse(response._bodyText);
        if (response.status === 201) {
          //console.log(body.success);
          dispatch(updateSettings(settings));
        }
      }
    );
  }
}