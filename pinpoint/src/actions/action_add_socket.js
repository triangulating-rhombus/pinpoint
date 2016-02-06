import { ADD_SOCKET } from '../constants/actionTypes';
import { createSocketConnection } from './utils';

export default function (successCallback) {
  return (dispatch) => {
    const socket = createSocketConnection();

    // System emits this event when fully connected
    socket.on('connect', function(){
      dispatch({ type: ADD_SOCKET, payload: socket });
      successCallback();
    });
  };
};
