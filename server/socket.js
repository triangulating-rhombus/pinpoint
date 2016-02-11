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
var NUM_FAKE_USERS = 10; // used only if includeFakeUsers is true
const DEFAULT_FAKE_LATITUDE = 37.783697;
const DEFAULT_FAKE_LONGITUDE = -122.408966;

// ---- Global variables ----
var serverSocket = null;
// Each object stores one entry for each connected user
//   key: socketID (unique for each user)
//   value: snapshot (object with socketID, latitude, longitude, and time)
var visitStarts = {};
var currPositions = {};

// Stores the current filter that each user wants to display
//   key: socketID
//   value: tag name (all lower-case)
var filterTags = {};

// ---- Fake users ----
var tagPool = ['cats', 'dogs', 'horses'];

var fakeUsers = [];
var generateRandomTags = function() {
  return [Utils.getRandomElement(tagPool)];
};

var initializeFakeUsers = function() {
  for (var i = 0; i < NUM_FAKE_USERS; i++) {
    var fakeUser = {
      socketID: '_fakeSocketID' + i.toString(),
      tags: generateRandomTags()
    };
    fakeUsers.push(fakeUser);
    currPositions[fakeUser.socketID] = {
      socketID: fakeUser.socketID,
      tags: fakeUser.tags,
      latitude: Utils.getRandomNumberWithinRange(DEFAULT_FAKE_LATITUDE, 0.01),
      longitude: Utils.getRandomNumberWithinRange(DEFAULT_FAKE_LONGITUDE, 0.01),
      time: new Date().valueOf() // now, in milliseconds since 1/1/1970
    };
  }
  setInterval(generateFakeUserSnapshots, 5000);
};

var generateFakeUserSnapshots = function() {
  _.forEach(fakeUsers, function(fakeUser) {
    var latestSnapshot = currPositions[fakeUser.socketID];
    var newSnapshot = {
      socketID: latestSnapshot.socketID,
      tags: fakeUser.tags,
      latitude: Utils.getRandomNumberWithinRange(latestSnapshot.latitude, 0.001),
      longitude: Utils.getRandomNumberWithinRange(latestSnapshot.longitude, 0.001),
      time: new Date().valueOf() // now, in milliseconds since 1/1/1970
    };
    currPositions[fakeUser.socketID] = newSnapshot;
  });
};

// ---- Export function and its handlers ----
module.exports = function(server, includeFakeUsers) {
  if (includeFakeUsers) {
    initializeFakeUsers();
  }

  serverSocket = SocketIO.listen(server);
  serverSocket.on('connection', function(clientSocket) {
    clientSocket.on('connected', connectHandler.bind(clientSocket));
    clientSocket.on('update', updateHandler.bind(clientSocket));
    clientSocket.on('changeFilterTag', changeFilterTagHandler);
    clientSocket.on('disconnected', disconnectHandler);
  });
  return serverSocket;
}

var connectHandler = function(snapshot) {
  var self = this;
  // Snapshots usually just contain socketID and position/time
  // On connection, the snapshot also includes the user's JWT token to authenticate them

  var username = JWT.decode(snapshot.token, 'secret');
  controller.findUser({ username: username })
  .then(function(user) {
    if (user) {
      controller.findUserTags(user.id)
      .then(function(tags) {
        // Augment snapshot with user info and save to currentPositions
        snapshot.tags = tags;
        snapshot.userID = user.id;
        visitStarts[snapshot.socketID] = snapshot;
        currPositions[snapshot.socketID] = snapshot;
        filterTags[snapshot.socketID] = null; //will default to show all
        var everybodyExceptMe = _.extend({}, currPositions );
        delete everybodyExceptMe[snapshot.socketID];

       // console.log("Every body except me", everybodyExceptMe);
       // console.log('Snapshots', snapshot.socketClient);
       // console.log('My serverID',snapshot.socketID);
       // console.log('Everybody except me', everybodyExceptMe);
       
       self.emit('refreshEvent', everybodyExceptMe);

      });
    } else {
      serverSocket.emit('error', 'username not found');
    }
  });
};

var updateHandler = function(snapshot) {
  var self = this;
  // Ignore unauthenticated socketIDs
  if (!visitStarts[snapshot.socketID]) {
    console.log('Received update from unauthenticated socketID...');
    console.log('Refresh your client simulator to fix this!')
    return;
  }

  // console.log('Client socket updated:', snapshot);
  var userID = visitStarts[snapshot.socketID].userID;
  controller.findUserTags(userID)
  .then(function(tags) {
    // Augment snapshot with user info and save to currentPositions
    snapshot.tags = tags;
    snapshot.userID = userID;
    currPositions[snapshot.socketID] = snapshot;
    
    var senderSocketID = snapshot.socketID;
    var filterTag = (filterTags[snapshot.socketID] === null) ?
      null :
      filterTags[snapshot.socketID].toLowerCase();
    var filteredUsers = null;

    if (filterTag) {
      filteredUsers = _.filter(currPositions, function(snapshot, socketID) {
        return _.contains(snapshot.tags, filterTag) && snapshot.socketID !== senderSocketID;
      });
    } else {
      filteredUsers = _.filter(currPositions, function(snapshot, socketID) {
        return snapshot.socketID !== senderSocketID;
      });
    }
    
    //currentUser.emit('refreshEvent', filteredUsers); 
    // filteredUsers.forEach(function(socket){
    //   console.log("Filtered users are ", socket.socketID );
    //   console.log('Data getting sent back to user',filteredUsers);
    // });
    // console.log("I expect an empty array", filteredUsers)

    //serverSocket.sockets.socket.emit('refreshEvent', filteredUsers);
    self.emit('refreshEvent', filteredUsers);
    // serverSocket.emit('refreshEvent', filteredUsers); 
  });
  
  var prevSnapshot = visitStarts[snapshot.socketID];
  var distance = Utils.getDistance(
    [prevSnapshot.latitude, prevSnapshot.longitude],
    [snapshot.latitude, snapshot.longitude]
  );
  var timeDiff = Utils.getTimeDifference(prevSnapshot.time, snapshot.time);
  // console.log('Test', distance);
  // console.log('time diff', timeDiff);
  // If user has left their last location
  if (distance >= ALLOWED_DISTANCE) {
    // Log visit to db if they had been there for at least MIN_VISIT_LENGTH seconds
    if (timeDiff >= MIN_VISIT_LENGTH) {
      prevSnapshot.endTime = new Date();
      controller.addVisit(prevSnapshot).then(function(obj) {
        controller.addTagsVisits(userID, obj[0].dataValues.id);
      });
    }

    // Set visitStart to current snapshot
    visitStarts[snapshot.socketID] = snapshot;
  }
};

var changeFilterTagHandler = function(data) {
  
  filterTags[data.socketID] = data.filterTag === 'Show All' ? null : data.filterTag;
}

var disconnectHandler = function(snapshot) {
  console.log('Client socket disconnected:', snapshot);
  delete currPositions[snapshot.socketID];
  delete visitStarts[snapshot.socketID];
  serverSocket.emit('refreshEvent', visitStarts);
};
