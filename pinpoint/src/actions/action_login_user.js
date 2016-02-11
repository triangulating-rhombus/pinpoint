import { LOGIN_USER } from './constants';
import { sendRequest } from './utils';

import addSocket from './action_add_socket';
import getSettings from './action_get_settings';

function loginUser(userInfo) {
  return {
    type: LOGIN_USER,
    payload: userInfo
  }
}

// Async action creator, which uses thunk to handle the promise
// This returns a FUNCTION, which thunk will automatically intercept
// Thunk will run the function and dispatch the appropriate vanilla action creator(s)
export default (user, navigator, geoNavigator) => {
 	return (dispatch) => {
 		sendRequest('POST', '/login', user)
    .then(
      response => {
        const body = JSON.parse(response._bodyText);
        if (response.status === 200) {
          body.username = user.username;
          dispatch(addSocket(body.token, geoNavigator));
          dispatch(getSettings(body.token));
          navigator.immediatelyResetRouteStack([{ name: 'TabBar' }]);
        }
        dispatch(loginUser(body));
      },
      error => {
        const body = JSON.parse(response._bodyText);
        dispatch(loginUser(body));
      }
    );
 	}
}