import {FILTER_BY_TAGS} '../constants/actionTypes';


const SERVER_URL = 'http://localhost:3000/tags';

// POST username/password to server to request authentication
// On response, initialize socket connection to server

// Move this function to utils later
function fetchFilteredTags (tags) {
  // fetch is React Native's built-in function to make AJAX requests
  return fetch(SERVER_URL, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
}

export default function (data) {
  return (dispatch) => {
    fetchFilteredTags(data).then(
      response => {
        const body = JSON.parse(response._bodyText);
      } 
    )
}