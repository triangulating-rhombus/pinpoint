import { SIGNUP_USER } from './constants';
import { sendRequest } from './utils';

import addSocket from './action_add_socket';
import getSettings from './action_get_settings';

function signupUser(userInfo) {
  return {
    type: SIGNUP_USER,
    payload: userInfo
  }
}

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and dispatch the appropriate vanilla action creator(s)
export default (user, navigator, geoNavigator) => {
  return (dispatch) => {
    sendRequest('POST', '/signup', user)
    .then(
      response => {
        const body = JSON.parse(response._bodyText);
        if (response.status === 200) {
          body.username = user.username;
          dispatch(addSocket(body.token, geoNavigator));
          dispatch(getSettings(body.token));
          navigator.immediatelyResetRouteStack([{ name: 'Settings' }]);
        }
        dispatch(signupUser(body));
      },
      error => {
        const body = JSON.parse(response._bodyText);
        dispatch(signupUser(body));
      }
    );
  }
}