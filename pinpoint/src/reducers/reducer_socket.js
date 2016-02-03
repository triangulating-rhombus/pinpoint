import { ADD_SOCKET } from '../constants/actionTypes';
import addSocket from '../actions/action_add_socket';

export default function(state=null, action){
  switch(action.type) {
    case ADD_SOCKET: 
      return action.payload;
    default:
      return state;
  }
}