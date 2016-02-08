import { ADD_SOCKET } from '../constants/actionTypes';
import { createSocketConnection } from './utils';

import store from '../../index.ios.js';
import updateAction from './action_update_geolocation';
import accountSetup from './action_account_setup';

function createAction(socket) {
  return {
    type: ADD_SOCKET,
    payload: socket
  }
}

export default function(token, geoNavigator) {
  return (dispatch) => {
    const socket = createSocketConnection();
    addListeners(dispatch, socket);
    addEmitters(socket, token, geoNavigator);
    // emitters will be set up in MapView, by attaching them to MapView's own navigator
  };
};

function addListeners(dispatch, socket) {
  // System emits this event when fully connected
  socket.on('connect', function(){
    dispatch(createAction(socket));
  });

  socket.on('refreshEvent', (data) => {
    store.dispatch(updateAction(data));    
  });

  socket.on('foundAccount', (data) => {
    store.dispatch(accountSetup(data));
  });

  socket.on('error', (error) => {
    console.log("Error", error);
  });
}

function addEmitters(socket, token, geoNavigator) {
    function emitSnapshot(gpsData, isInitialSnapshot) {
      var socketData = {
        socketID: socket.id,
        time: gpsData.timestamp,
        latitude: gpsData.coords.latitude,
        longitude: gpsData.coords.longitude,
        currentTagLabel: store.currentTagLabel
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

    console.log("A");

  console.log(navigator);
    // Sends initial snapshot to server
    navigator.geolocation.getCurrentPosition(() => {}, logError);
    console.log("B");

    // Sends periodic snapshots to server
    setInterval(function(){       
      navigator.geolocation.getCurrentPosition(gpsData => emitSnapshot(gpsData, false), logError)  
    }, 5000);
    console.log("C");
  }
