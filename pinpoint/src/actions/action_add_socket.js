import { ADD_SOCKET } from '../constants/actionTypes';
import io from '../../node_modules/socket.io-client/socket.io';

export default function () {


  return (dispatch) => {

    const socket = io.connect('http://localhost:3000', { jsonp:false });

    
    // currently assuming that socket connection is synchronous
    dispatch({ type: ADD_SOCKET, payload:socket})
    
    // socket.on('connect', function(){
    //   console.log("Socket has been connected");
    // });

    // REFRESH_EVENT is not yet actually implemented
    // But using the socket would be something like this.
    // socket.on('refreshEvent', message => {
    //   store.dispatch({ type: 'REFRESH_EVENT' });
    // }); 
  }

  

}
