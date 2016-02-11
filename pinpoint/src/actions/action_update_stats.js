import { UPDATE_STATS } from '../constants/actionTypes';
import { sendRequest } from './utils';

import showStats from './action_show_stats';

// Vanilla action creator
function updateStats(statsInfo) {
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
    dispatch(updateStats({ poi, error: null, warning: 'NOT_LOADED' }));
    dispatch(showStats());

    // Upon request completion, update state with response
    sendRequest('POST', '/stats', { latitude, longitude, tag })
    .then(
      response => {
        const responseBody = JSON.parse(response._bodyText);
        // console.log('response from stats:', responseBody);
        const { visitsByDay, address, error, warning } = responseBody;
        dispatch(updateStats({ address, visitsByDay, error, warning }));
      },
      error => {
        dispatch(updateStats({ error, warning: null }));
      }
    );
  }
}