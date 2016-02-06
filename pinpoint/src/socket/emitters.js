export const initialGeoLocation = (props, data) => {

  let socket = props.socket;
  let socketID = socket.id;

  let token = props.user.token;
  let time = data.timestamp;
  let latitude = data.coords.latitude;
  let longitude = data.coords.longitude;
  let currentTagLabel = props.currentTagLabel;

  var socketData = {
    token,
    time,
    socketID,
    latitude,
    longitude,
    currentTagLabel
  };

  socket.emit('connected', socketData );
  
} 

export const updateGeoLocation = (props, data) => {
  let socket = props.socket;
  let socketID = socket.id;
  let time = data.timestamp;
  let latitude = data.coords.latitude;
  let longitude = data.coords.longitude;
  let currentTagLabel = props.currentTagLabel;

  var socketData = {
    time,
    latitude,
    longitude,
    socketID,
    currentTagLabel
  };
  console.log("Emitter Tag label is:", socketData.currentTagLabel)
  socket.emit('update', socketData );
}
