import { ADD_SOCKET } from '../constants/actionTypes';
import io from '../../node_modules/socket.io-client/socket.io';

export default function () {


  return (dispatch) => {

    const socket = io.connect('http://localhost:3000', { jsonp:false });

    // System emits this event when fully connected
    socket.on('connect', function(){
        dispatch({ type: ADD_SOCKET, payload:socket})
    });

  }

  

}
