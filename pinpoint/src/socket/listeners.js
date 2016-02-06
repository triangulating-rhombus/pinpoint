import store from '../../index.ios.js';
import updateAction from '../actions/action_update_geolocation.js';
import accountSetup from '../actions/action_account_setup.js';

export default (socket) => {
  socket.on('refreshEvent', (data) => {
    store.dispatch(updateAction(data));    
  });

  socket.on('foundAccount', (data) => {
    store.dispatch(accountSetup(data));
  });

  socket.on('error', (error) => {
    console.log("Error", error);
  });
};
