import { SET_POI } from '../constants/actionTypes';

const SERVER_URL = 'http://localhost:3000/stats';

// Move this function to utils later
function fetchStats(latitude, longitude, tag) {
  // fetch is React Native's built-in function to make AJAX requests
  return fetch(SERVER_URL, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lat: latitude,
      lon: longitude,
      tag
    })
  });
}

// Vanilla action creator
function setPoi(poi) {
  return {
    type: SET_POI,
    payload: poi
  }
};

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and then dispatch the appropriate vanilla action creator
export default function (latitude, longitude) {
  return (dispatch) => {
    fetchStats(latitude, longitude, 'Tennis').then(
      response => {
        console.log('response from /stats:', response);
        const body = JSON.parse(response._bodyText);
        if (response.status === 200) {
          dispatch(setPoi({
            latitude,
            longitude,
            tag: 'Tennis',
            stats: body
          }));
        }
        // successCallback();
      },
      error => {
        console.log('error');
        // successCallback();
      }
    );
  }
}