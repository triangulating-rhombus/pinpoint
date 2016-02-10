import { UPDATE_STATS } from '../constants/actionTypes';
import { sendRequest } from './utils';

import showStats from './action_show_stats';

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
function updateStats(statsInfo) {
  // Augment stats with friendlyExplanation based on error/warning
  const { error, warning } = statsInfo;
  if (error || warning) {
    statsInfo.friendlyExplanation = getFriendlyExplanation(error || warning);
  }

  // Send action
  return {
    type: UPDATE_STATS,
    payload: statsInfo
  }
};

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and then dispatch the appropriate action creators
export default function getStats(latitude, longitude, tag) {
  return (dispatch) => {
    const poi = { latitude, longitude };
    
    // First update state to indicate that stats are loading
    dispatch(updateStats({ poi, error: 'NOT_LOADED' }));
    dispatch(showStats());

    // Upon request completion, update state with response
    sendRequest('POST', '/stats', {
      lat: latitude,
      lon: longitude,
      tag
    })
    .then(
      response => {
        const responseBody = JSON.parse(response._bodyText);
        console.log('response from stats:', responseBody);
        if (responseBody.error) {
          dispatch(updateStats({ error: responseBody.error }));
        } else if (responseBody.warning) {
          dispatch(updateStats({ error: null, warning: responseBody.warning }));
        } else {
          dispatch(updateStats({ visitsByDay: responseBody, error: null, warning: null }));
        }
        dispatch(showStats());
      },
      error => {
        dispatch(updateStats({ error }));
        dispatch(showStats());
      }
    );
  }
}