import { GET_SETTINGS } from './constants';
import { sendRequest } from './utils';

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
export default function requestSettings(token) {
  return (dispatch) => {
    sendRequest('GET', '/settings', null, { 'x-access-token': token })
    .then(
      response => {
        const body = JSON.parse(response._bodyText);
        if (response.status === 200) {
          dispatch(getSettings(body));
        }
      },
      error => {
        callback();
      }
    );
  }
}