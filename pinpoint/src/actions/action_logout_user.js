import { LOGOUT_USER } from '../constants/actionTypes';

import removeSocket from './action_remove_socket';
import clearSettings from './action_clear_settings';

function logoutUser() {
  return {
    type: LOGOUT_USER
  }
}

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and dispatch the appropriate vanilla action creator(s)
export default (navigator) => {
  return (dispatch) => {
    dispatch(removeSocket());
    dispatch(clearSettings());
    dispatch(logoutUser());
    navigator.immediatelyResetRouteStack([{ name: 'Login' }]);
  }
}