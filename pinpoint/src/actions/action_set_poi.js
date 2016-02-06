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

function getFriendlyExplanation(errorOrWarningName) {
  switch(errorOrWarningName) {
    case 'NOT_LOADED':
      return 'Loading...';
    case 'NO_VISITS':
      return 'No visits logged for that location!';
    case 'OVER_QUERY_LIMIT':
      return 'Oh no! Our geocoder\'s daily limit has been reached.';
    case 'ZERO_RESULTS':
      return 'Sorry - we couldn\'t quite figure out that address. Try another spot?';
    default:
      return 'Uh oh - something strange happened.';
  }
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
        const stats = JSON.parse(response._bodyText);
        if (stats.error || stats.warning) {
          stats.friendlyExplanation = getFriendlyExplanation(stats.error || stats.warning);
        }
        dispatch(setPoi({
          latitude,
          longitude,
          tag: 'Tennis',
          stats
        }));
        // successCallback();
      },
      error => {
        console.log('error');
        // successCallback();
      }
    );
  }
}