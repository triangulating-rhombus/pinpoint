import { ADD_SOCKET, REMOVE_SOCKET } from '../constants/actionTypes';

const INITIAL_STATE = {
  connection: null,
  id: null,
  updater: null
};

export default function(state=INITIAL_STATE, action){
  switch(action.type) {
    case ADD_SOCKET:
      return action.payload;
    case REMOVE_SOCKET:
      return INITIAL_STATE;
    default:
      return state;
  }
}
