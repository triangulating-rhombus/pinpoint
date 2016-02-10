import { UPDATE_SETTINGS } from '../constants/actionTypes';
import { DISPLAY_HOTSPOTS } from '../constants/actionTypes';
import { sendRequest } from './utils';

const SERVER_URL = 'http://localhost:3000/settings';
const HOTSPOT_URL = 'http://localhost:3000/hotspot';

function getHotspots(tag){
  return fetch(HOTSPOT_URL, {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      'tag' : tag
    }
  });
}

// Vanilla action creators
function updateSettings(settings) {
  return {
    type: UPDATE_SETTINGS,
    payload: settings
  }
}

function displayHotspots(data){
  return {
    type: DISPLAY_HOTSPOTS,
    payload: data
  }
}



// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and then dispatch the appropriate vanilla action creator

export default function submitSettings(settings, token, successCallback, store, navigator) {

  return (dispatch) => {


    if(store.hotSpotVisibility){
      let tag = settings.tag1;
      console.log("What we are sending back to Backend", tag)
      getHotspots(tag)
      .then(
        response => {
         const body = JSON.parse(response._bodyText);
         dispatch(displayHotspots(body));
        }
      );
    }

    sendRequest('POST', '/settings', settings, token)
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
