import store from '../../index.ios.js';

export default (socket) => {
  socket.on('refreshEvent', (data) => {
    // Dispatching events here to the store to update the map view
    console.log('Listening for data', data);
  });

  socket.on('error', (error) => {
    console.log("Error", error);
  });
};
