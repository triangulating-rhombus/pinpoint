import { CHECK_USER } from '../constants/actionTypes';

import Socket from '../socket/socket.js';
import Store from '../../index.ios';

// Make an ajax request to the database to authenticate the user
// Possibly we may initialize the socket.

const server = 'http://localhost:3000/test';

// Move this function to utils later
const fetchUserData = (user) => {
  // fetch is React Native's built-in function to make AJAX requests
  return fetch(server, { 
  	method: 'POST',
  	headers: { 'Content-Type': 'application/json' },
  	body: JSON.stringify(user)
  });
}

// This function will be triggered by login.js dumb component
// Unlike normal action creators, checkUser returns a FUNCTION instead of an action
// This function will be called by thunk middleware to handle the promise
// It will return the parameters from login (as user)
// The login container has checkUser action function bound and send it to the reducer, 
// where it will listen to an action type of CHECK USER.

export default function checkUser(user, navigator) {
 	return (dispatch) => {
 		fetchUserData(user)
		.then((response) => {
      navigator.push({ id: 'MapView' });
      // After the user is authenticated, create a connection to the store
      // We are now listening for socket events
      Socket(Store);

			return dispatch({ type: CHECK_USER, payload: user });
		})
		.catch(error => console.log(error));
 	}
}

