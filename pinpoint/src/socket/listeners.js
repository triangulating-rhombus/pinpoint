import store from '../../index.ios.js';
import updateAction from '../actions/action_update_geolocation.js';


export default (socket) => {
  socket.on('refreshEvent', (data) => {
    console.log('Data being streamed', data)
    store.dispatch(updateAction(data));    
  });

  socket.on('error', (error) => {
    console.log("Error", error);
  });
};
