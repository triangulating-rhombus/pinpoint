import { ADD_SOCKET } from '../constants/actionTypes';
import addSocket from '../actions/action_add_socket';

const INITIAL_STATE = {
  connection: null,
  id: null,
  updater: null
};

export default function(state=INITIAL_STATE, action){
  switch(action.type) {
    case ADD_SOCKET:
      return action.payload;
    default:
      return state;
  }
}
