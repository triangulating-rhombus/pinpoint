import { CHECK_USER } from '../constants/actionType';

import Socket from '../socket/socket.js';
import Store from '../../index.ios';

// Make an ajax request to the database to authenticate the user
// Possibly we may initiliaze the socket.

const server = 'http://localhost:3000/signup';


// We will want to modularize this out to a utils later, import the utils folder and use it in checkuser
// fetch is react native's built in function of an ajax call (don't let the word FETCH fool you, it can make posts)
const fetchUserData =  (user) => {
  return fetch(server, {
  	method: 'POST',
  	headers: {
  		'Content-Type': 'application/json',
  	},
  	body: JSON.stringify(user)
  	
  })
}

/* This function will be triggered by login.js dumb component. The dispatch (which is a function WITHIN the checkuser function
will be invoked by the thunk middleware)  
It will return the parameters from login (as user)
The login container has checkUser action function bound and send it to the reducer, 
where it will listen to an action type of CHECK USER. 
 */

const checkUser = (user, navigator) => {
 	return (dispatch) => {
 		fetchUserData(user)
 			.then( (response) => {

        navigator.push({id:'MapView'});
        // After the user is authenticated create a connection to the store
        // We are now listening for socket events
        Socket(Store);


 				return dispatch({ type: CHECK_USER, payload: user });
 			})
 			.catch( (error) => console.log(error));
 	}
}


export default checkUser;

