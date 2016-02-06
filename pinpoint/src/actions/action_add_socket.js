import { ADD_SOCKET } from '../constants/actionTypes';
import { createSocketConnection } from './utils';

function createAction(socket) {
  return {
    type: ADD_SOCKET,
    payload: socket
  }
}

export default function() {
  return (dispatch) => {
    const socket = createSocketConnection();

    // System emits this event when fully connected
    socket.on('connect', function(){
      dispatch(createAction(socket));
    });
  };
};
