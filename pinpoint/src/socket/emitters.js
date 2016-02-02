export const initialGeoLocation = (props, data) => {


  let socket = props.socket;
  console.log('socket',socket.id);
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
  //console.log('Before sending to wayne', socketData);
  console.log("connecting (called once)");
  //socket.emit('connected', socketData );
} 

export const updateGeoLocation = (props, data) => {
  console.log("GeoLocation is updating", data);

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
  console.log("Updating called");

  //socket.emit('update', socketData );
}
