import { ADD_SOCKET, REMOVE_SOCKET } from '../actions/constants';

const INITIAL_STATE = {
  connection: null,
  id: null,
  updater: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_SOCKET:
      return action.payload;
    case REMOVE_SOCKET:
      clearInterval(state.updater); // stop sending periodic updates through this connection
      state.connection.emit('disconnected', { socketID: state.id }); // end connection with server
      state.connection.disconnect();
      return INITIAL_STATE;
    default:
      return state;
  }
}