// Exports a function that takes a server as input and returns a server socket
// Server socket will handle all client sockets for application

var _ = require('underscore');
var SocketIO = require('socket.io');
var JWT = require('jwt-simple');
var controller = require('./controller');
var Utils = require('./utils');

// ---- Constants ----
var MIN_VISIT_LENGTH = 3; // seconds stopped in one location to count as a visit
var ALLOWED_DISTANCE = 10; // meters away from last position to count as continuing a visit
var NUM_FAKE_USERS = 3; // used only if includeFakeUsers is true
const DEFAULT_FAKE_LATITUDE = 37.331177;
const DEFAULT_FAKE_LONGITUDE = -122.031641;

// ---- Global variables ----
var serverSocket = null;
// Each object stores one entry for each connected user
//   key: socketID (unique for each user)
//   value: snapshot (object with socketID, latitude, longitude, and time)
var visitStarts = {};
var currPositions = {};
var fakeUsers = [];

// ---- Fake users ----
var initializeFakeUsers = function() {
  for (var i = 0; i < NUM_FAKE_USERS; i++) {
    var fakeUser = '_fakeUser' + i.toString();
    fakeUsers.push(fakeUser);
    currPositions[fakeUser] = {
      socketID: fakeUser,
      latitude: DEFAULT_FAKE_LATITUDE,
      longitude: DEFAULT_FAKE_LONGITUDE,
      time: new Date().valueOf() // now, in milliseconds since 1/1/1970
    };
  }
  setInterval(generateFakeUserSnapshots, 5000);
};

var generateFakeUserSnapshots = function() {
  _.forEach(fakeUsers, function(fakeUser) {
    var latestSnapshot = currPositions[fakeUser];
    var newSnapshot = {
      socketID: latestSnapshot.socketID,
      latitude: Utils.getRandomNumberWithinRange(latestSnapshot.latitude, 0.001),
      longitude: Utils.getRandomNumberWithinRange(latestSnapshot.longitude, 0.001),
      time: new Date().valueOf() // now, in milliseconds since 1/1/1970
    };
    currPositions[fakeUser] = newSnapshot;
  });
};

// ---- Export function and its handlers ----
module.exports = function(server, includeFakeUsers) {
  if (includeFakeUsers) {
    initializeFakeUsers();
  }

  serverSocket = SocketIO.listen(server);
  serverSocket.on('connection', function(clientSocket) {
    clientSocket.on("connected", connectHandler);
    clientSocket.on("update", updateHandler);
    clientSocket.on("disconnected", disconnectHandler);
  });
  return serverSocket;
}

var connectHandler = function(snapshot) {
  // Snapshots usually just contain socketID and position/time
  // On connection, the snapshot also includes the user's JWT token to authenticate them
  console.log("Client connected with socketID:", snapshot.socketID);
  var username = JWT.decode(snapshot.token, "secret");
  controller.findUser({ username: username })
  .then(function(user) {
    if (user) {
      snapshot.userID = user.id;
      visitStarts[snapshot.socketID] = snapshot;
      currPositions[snapshot.socketID] = snapshot;
      serverSocket.emit('refreshEvent', currPositions);
    } else {
      serverSocket.emit('error', 'username not found');
    }
  });
};

var updateHandler = function(snapshot) {
  var userID = visitStarts[snapshot.socketID].userID;
  controller.findUserTags(userID)
  .then(function(tags) {
    // Augment snapshot with user info and save to currentPositions
    snapshot.tags = tags;
    snapshot.userID = userID;
    currPositions[snapshot.socketID] = snapshot;

    // Send current positions of all users back to clientSocket
    serverSocket.emit('refreshEvent', currPositions);
  });
  
  var prevSnapshot = visitStarts[snapshot.socketID];
  var distance = Utils.getDistance(
    [prevSnapshot.latitude, prevSnapshot.longitude],
    [snapshot.latitude, snapshot.longitude]
  );
  var timeDiff = Utils.getTimeDifference(prevSnapshot.time, snapshot.time);
  
  // If user has left their last location
  if (distance >= ALLOWED_DISTANCE) {
    // Log visit to db if they had been there for at least MIN_VISIT_LENGTH seconds
    if (timeDiff >= MIN_VISIT_LENGTH) {
      prevSnapshot.endTime = new Date();
      controller.addVisit(prevSnapshot).then(function(obj) {
        controller.addTagsVisits(userID, obj[0].snapshotValues.id);
      });
    }

    // Set visitStart to current snapshot
    visitStarts[snapshot.socketID] = snapshot;
  }
};

var disconnectHandler = function(snapshot) {
  delete currPositions[snapshot.userID];
  delete visitStarts[snapshot.userID];
  serverSocket.emit('refreshEvent', visitStarts);
};