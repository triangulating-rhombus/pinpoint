export const initialGeoLocation = (socket, data, tags) => {
  let time = data.timestamp;
  let latitude = data.coords.latitude;
  let longitude = data.coords.longitude;
  let dummyUserID = 3;

  var socketData = {
    time,
    latitude,
    longitude,
    userID: dummyUserID,
    tags: ['food', 'cars', 'sports']
  };

  // NOTE we will need to add tags to the state at some point
  socket.emit('connected', socketData );
} 

export const updateGeoLocation = (socket, data, tags) => {
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

  // socket.emit('update', data );
}




// { userID: 1, longitude: 120.22, latitude: 11.22, time: new Date(), tags: ["coding", "books", "eat"]}



// socket.emit('update', { userID: 1, longitude: 120.22, latitude: 11.22, time: new Date(), tags: ["coding", "books", "eat"])
