import { ADD_SOCKET } from './constants';
import { createSocketConnection } from './utils';

import updateAction from './action_update_markers';

function createAction(connection, id, updater) {
  const socketInfo = {
    connection,
    id,
    updater
  };

  return {
    type: ADD_SOCKET,
    payload: socketInfo
  }
}

export default function(token, geoNavigator) {
  // console.log("It seems like the action file isnt even being called!!!")
  return (dispatch) => {
    const socketConnection = createSocketConnection();
    // Add socket listeners and emitters
    addListeners(dispatch, socketConnection, (socketID) => {
      addEmitters(dispatch, socketConnection, token, geoNavigator, socketID);
    });
  };
};

function addListeners(dispatch, socketConnection, callback) {
  // System emits this event when fully connected
  socketConnection.on('connect', function(){
    const socketID = socketConnection.id; // we are only guaranteed socketID can be accessed here
    dispatch(createAction(socketConnection));
    callback(socketID);
  });

  socketConnection.on('refreshEvent', (data) => {
    dispatch(updateAction(data));    
  });

  socketConnection.on('error', (error) => {
    console.log("Error", error);
  });
}

function addEmitters(dispatch, socketConnection, token, geoNavigator, socketID ) {

  function emitSnapshot(gpsData, isInitialSnapshot) {

    var socketData = {
      socketID,
      time: gpsData.timestamp,
      latitude: gpsData.coords.latitude,
      longitude: gpsData.coords.longitude,
    };

    if (isInitialSnapshot) {
      socketData.token = token;
      socketConnection.emit('connected', socketData);
    } else {
      socketConnection.emit('update', socketData );
    }
  }

  function logError(error) {
    console.log('Navigator \'getCurrentPosition\' error:', error);
  };

  // Sends initial snapshot to server
  geoNavigator.geolocation.getCurrentPosition(gpsData => emitSnapshot(gpsData, true), logError);
  // Sends periodic snapshots to server
  const updater = setInterval(function() {
    geoNavigator.geolocation.getCurrentPosition(gpsData => emitSnapshot(gpsData, false), logError)  
  }, 1000);

  dispatch(createAction(socketConnection, socketID, updater));
}