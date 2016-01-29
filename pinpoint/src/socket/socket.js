import io from '../../node_modules/socket.io-client/socket.io';

export default function (store) {

  // const socket = io.connect(`${location.protocol}//${location.host}`);
  const socket = io.connect('http://localhost:3000',{ jsonp: false });
  
  socket.on('connect', function(){
    console.log("Socket is connected");
  });

  // REFRESH_EVENT is not yet actually implemented
  // But using the socket would be something like this.
  socket.on('refreshEvent', message => {
    store.dispatch({ type: 'REFRESH_EVENT' });
  });

  

}
