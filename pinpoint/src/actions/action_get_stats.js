import { GET_STATS } from '../constants/actionTypes';

const SERVER_URL = 'http://localhost:3000/stats';

// Move this function to utils later
function fetchStats(stats) {
  // fetch is React Native's built-in function to make AJAX requests
  return fetch(SERVER_URL, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stats)
  });
}

// Vanilla action creator
function getStats(stats) {
  return {
    type: GET_STATS,
    payload: stats
  }
}

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and then dispatch the appropriate vanilla action creator
export default function submitStats(stats, successCallback) {
  return (dispatch) => {
    fetchStats(stats).then(
      response => {
        console.log('response from /stats:', stats);
        const body = JSON.parse(response._bodyText);
        if (response.status === 200) {
          dispatch(getStats(body));
        }
        successCallback();
      },
      error => {
        callback();
      }
    );
  }
}