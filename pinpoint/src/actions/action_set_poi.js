import { SET_POI } from '../constants/actionTypes';
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
function setPoi(poi) {
  // Augment stats with friendlyExplanation based on error/warning
  const { stats } = poi;
  if (stats.error || stats.warning) {
    stats.friendlyExplanation = getFriendlyExplanation(stats.error || stats.warning);
  }

  // Send action
  return {
    type: SET_POI,
    payload: poi
  }
};

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and then dispatch the appropriate action creators
export default function (latitude, longitude, tag) {
  return (dispatch) => {

    // First update state to indicate that stats are loading
    const unloadedStats = { error: 'NOT_LOADED' };
    dispatch(setPoi({ latitude, longitude, tag, stats: unloadedStats }));
    dispatch(showStats());

    // Upon request completion, update state with response
    sendRequest('POST', '/stats', {
      lat: latitude,
      lon: longitude,
      tag
    })
    .then(
      response => {
        const stats = JSON.parse(response._bodyText);
        console.log('response from stats:', stats);
        dispatch(setPoi({ latitude, longitude, tag, stats }));
        dispatch(showStats());
      },
      error => {
        const stats = { error };
        dispatch(setPoi({ latitude, longitude, tag, stats }));
        dispatch(showStats());
      }
    );
  }
}