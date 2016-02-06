export const initialGeoLocation = (props, data) => {

  let socket = props.socket;
  let socketID = socket.id;

  let token = props.user.token;
  let time = data.timestamp;
  let latitude = data.coords.latitude;
  let longitude = data.coords.longitude;


  var socketData = {
    token,
    time,
    socketID,
    latitude,
    longitude,
  };
  
  socket.emit('connected', socketData );
} 

export const updateGeoLocation = (props, data) => {
  let socket = props.socket;
  let socketID = socket.id;
  let time = data.timestamp;
  let latitude = data.coords.latitude;
  let longitude = data.coords.longitude;

  var socketData = {
    time,
    latitude,
    longitude,
    socketID
  };

  socket.emit('update', socketData );
}
