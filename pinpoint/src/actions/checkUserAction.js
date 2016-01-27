import { CHECK_USER } from '../constants/actionType';

// Make an ajax request to the database to authenticate the user
// Possibly we may initiliaze the socket.

const checkUser = (user) => {
  return {
    type: CHECK_USER,
    payload: user 
  }
}

export default checkUser;
