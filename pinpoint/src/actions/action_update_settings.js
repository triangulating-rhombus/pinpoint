import { UPDATE_SETTINGS } from '../constants/actionTypes';
import { sendRequest } from './utils';

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
    sendRequest('POST', '/settings', settings, token)
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