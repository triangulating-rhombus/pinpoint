import { UPDATE_SETTINGS } from './constants';
import { sendRequest } from './utils';
import updateHotspots from './action_update_hotspots';

// Vanilla action creator
function updateSettings(settings) {
  return {
    type: UPDATE_SETTINGS,
    payload: settings
  }
}

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and then dispatch the appropriate vanilla action creator

export default function submitSettings(settings, token, successCallback) {
  return (dispatch) => {
    sendRequest('POST', '/settings', settings, { 'x-access-token': token })
    .then(
      response => {
        const body = JSON.parse(response._bodyText);
        if (response.status === 201) {
          dispatch(updateSettings(settings));
          successCallback();
        }
      }
    );
  }
}
