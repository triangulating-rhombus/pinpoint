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
    dispatch(updateStats({ poi, error: 'NOT_LOADED' }));
    dispatch(showStats());

    // Upon request completion, update state with response
    sendRequest('POST', '/stats', { latitude, longitude, tag })
    .then(
      response => {
        const responseBody = JSON.parse(response._bodyText);
        console.log('response from stats:', responseBody);
        if (responseBody.error) {
          dispatch(updateStats({ visitsByDay: null, error: responseBody.error, warning: null }));
        } else if (responseBody.warning) {
          dispatch(updateStats({ visitsByDay: null, error: null, warning: responseBody.warning }));
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