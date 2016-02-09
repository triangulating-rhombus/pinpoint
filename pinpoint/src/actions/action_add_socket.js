import { ADD_SOCKET } from '../constants/actionTypes';
import { createSocketConnection } from './utils';

import updateAction from './action_update_geolocation';

function createAction(socket) {
  return {
    type: ADD_SOCKET,
    payload: socket
  }
}

export default function(token, geoNavigator) {
  return (dispatch) => {
    const socket = createSocketConnection();

    // Add socket listeners and emitters
    addListeners(dispatch, socket, (socketID) => {
      addEmitters(socket, token, geoNavigator, socketID);
    });
  };
};

function addListeners(dispatch, socket, callback) {
  // System emits this event when fully connected
  socket.on('connect', function(){
    const socketID = socket.id; // we are only guaranteed socketID can be accessed here
    dispatch(createAction(socket));
    callback(socketID);
  });

  socket.on('refreshEvent', (data) => {
    dispatch(updateAction(data));    
  });

  socket.on('error', (error) => {
    console.log("Error", error);
  });
}

function addEmitters(socket, token, geoNavigator, socketID) {
  function emitSnapshot(gpsData, isInitialSnapshot) {
    var socketData = {
      socketID,
      time: gpsData.timestamp,
      latitude: gpsData.coords.latitude,
      longitude: gpsData.coords.longitude,
    };

    if (isInitialSnapshot) {
      socketData.token = token;
      socket.emit('connected', socketData);
    } else {
      socket.emit('update', socketData );
    }
  }

  function logError(error) {
    console.log('Navigator \'getCurrentPosition\' error:', error);
  };

  // Sends initial snapshot to server
  navigator.geolocation.getCurrentPosition(gpsData => emitSnapshot(gpsData, true), logError);

  // Sends periodic snapshots to server
  setInterval(function() {
    navigator.geolocation.getCurrentPosition(gpsData => emitSnapshot(gpsData, false), logError)  
  }, 5000);
}