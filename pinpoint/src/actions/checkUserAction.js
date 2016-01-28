import { CHECK_USER } from '../constants/actionType';

// Make an ajax request to the database to authenticate the user
// Possibly we may initiliaze the socket.

const WAYNE_IP_TEST = 'http://10.8.32.166:3000/test';


// We will want to modularize this out to a utils later, import the utils folder and use it in checkuser
// fetch is react native's built in function of an ajax call (don't let the word FETCH fool you, it can make posts)
const fetchUserData =  (user) => {
  return fetch(WAYNE_IP_TEST, {
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

const checkUser = (user) => {
 	return (dispatch) => {
 		fetchUserData(user)
 			.then( (response) => {
 				return { type: CHECK_USER, payload: user }
 			})
 			.catch( (error) => console.log(error));
 	}
}


export default checkUser;

