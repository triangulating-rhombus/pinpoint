export const initialGeoLocation = (props, data) => {

  let socket = props.socket;
  let socketID = socket.id;
  let token = props.user.token;
  let time = data.timestamp;
  let latitude = data.coords.latitude;
  let longitude = data.coords.longitude;
  let tags = ['food', 'cars', 'sports'];
  let userID = 3;

  var socketData = {
    token,
    time,
    socketID,
    latitude,
    longitude,
    tags,
    userID
  };

  socket.emit('connected', socketData );
} 

export const updateGeoLocation = (socket, data, tags) => {
  console.log("GeoLocation is updating", data);

  let time = data.timestamp;
  let latitude = data.coords.latitude;
  let longitude = data.coords.longitude;
  let dummyUserID = tags;

  var socketData = {
    time,
    latitude,
    longitude,
    userID: dummyUserID,
    tags: ['food', 'cars', 'sports']
  };

  socket.emit('update', data );
}
