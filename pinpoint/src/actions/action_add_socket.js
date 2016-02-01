import { ADD_SOCKET } from '../constants/actionTypes';
import io from '../../node_modules/socket.io-client/socket.io';

export default function () {


  return (dispatch) => {

    const socket = io.connect('http://localhost:3000', { jsonp:false });

    
    
    socket.on('connect', function(){
        // currently assuming that socket connection is synchronous
        dispatch({ type: ADD_SOCKET, payload:socket})
         console.log("Socket has been connected");
    });

  }

  

}
