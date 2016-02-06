var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var db = require('./db/dbModel');
var controller = require('./controller');
var utils = require('./utils');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

db.init();


/* *******  
Login and Signup
   *******
*/

app.post('/login', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;

  controller.authenticateUser(username, password, function(err, match) {
  	if (err) { // err: String describing the error
  		res.status(401).json({error: err});
  	} else {
  		var token = jwt.encode(username, 'secret');
  		res.json({ token: token });	
		}
  });
});

app.post('/signup', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	var userObj = {
		username: username,
		password: password
	};

	controller.findUser(userObj)
	.then(function(user) {
		if (user) {
			res.status(401).json({error: "user already exists!"});
		} else {
			controller.addUser(userObj);
			var token = jwt.encode(username, 'secret');
  		res.json({token:token})
		}
	});
});

/* ***** 
	Settings
***** */

app.post('/settings', function (req, res) {
	var token = req.headers['x-access-token']; 
	var user = jwt.decode(token, "secret");
	var tag1 = req.body.tag1;
	var tag2 = req.body.tag2;
	var tag3 = req.body.tag3;
	var isBroadcasting = req.body.isBroadcasting;

	controller.findUser({ username: user })
	.then(function(user) {
		var userID = user.id;
		controller.addTag([tag1, tag2, tag3])
		.then(function(results) {
			var tagsArray = results.map(function(tag){
				return tag[0].dataValues.id;
			});
			controller.addTagsUsers(tagsArray, userID)
			res.send("tags added");
		});
	});

	controller.setBroadcast(user, isBroadcasting);
});

app.get('/settings', function (req, res) {
	var token = req.headers['x-access-token']; 
	var user = jwt.decode(token, "secret");

	controller.findSettings(user)
	.then(function(result) {
		res.send(result);
	});
});

/* ***** 
	Stats
***** */

// This is really more of a GET request, but we use POST to send parameters
app.post('/stats', function(req, res){

	var lat = req.body.lat;
	var lon = req.body.lon;
	var tag = req.body.tag;

	console.log('got POST to /stats:', lat, lon, tag);

	controller.visitStats(lat, lon, tag)
	.then(function(result){
		console.log('got POST to /stats:', lat, lon, tag);
		res.json(result);
	});
});

controller.getHotSpots("shopping", function(result){
	console.log(result);
})



// setInterval(function(){
// 	for (var i = 0; i < 5; i++){

// 	      var sign = Math.random() > 0.5? -1: 1;
// 	      var lon = -122.031641 + sign * Math.random() * .002;
// 	      sign = Math.random() > 0.5? -1: 1;
// 	      var lat = 37.331177 + sign * Math.random() * .002;
// 	      var time = new Date();
// 	      time.setDate(time.getDate() + Math.floor(Math.random() * (7)));

// 	      var random = {token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IndheW5lIg.66Qxc0MBJv_cJyvP8WfiEUCZZ4X1BXBSghVQVuAgBTA", 
// 	      socketID: null, longitude: lon, latitude: lat, time: time, endTime: time};

// 	      controller.addVisit(random).then(function(obj){
	        
// 	        controller.addTagsVisits(1, obj[0].dataValues.id);
// 	      });
// 	}
// }, 1500)


/* ***** 
	Sockets for user geolocation updates
***** */

// Constants
var MIN_VISIT_LENGTH = 3; // seconds stopped in one location to count as a visit
var ALLOWED_DISTANCE = 10; // meters away from last position to count as continuing a visit

// Each object stores one entry for each connected user
//   key: socketID (unique for each user)
//   value: snapshot (object with socketID, latitude, longitude, and time)
var visitStarts = {};
var currPositions = {};

var io = require('socket.io').listen(server);
io.on('connection', function(client) {

	client.on("connected", function(snapshot) {
		// Snapshots usually just contain socketID and position/time
		// On connection, the snapshot also includes the user's JWT token to authenticate them
		console.log("Client connected with socketID:", snapshot.socketID);
		var username = jwt.decode(snapshot.token, "secret");
		controller.findUser({ username: username })
		.then(function(user) {
			if (user) {
				snapshot.userID = user.id;
				visitStarts[snapshot.socketID] = snapshot;
				currPositions[snapshot.socketID] = snapshot;
				io.emit('refreshEvent', currPositions);
			} else {
				io.emit('error', 'username not found');
			}
		});
	});

	client.on("update", function(snapshot) {
		var userID = visitStarts[snapshot.socketID].userID;
		controller.findUserTags(userID)
		.then(function(tags) {
			// Augment snapshot with user info and save to currentPositions
			snapshot.tags = tags;
			snapshot.userID = userID;
			currPositions[snapshot.socketID] = snapshot;

			// Send current positions of all users back to client
			io.emit('refreshEvent', currPositions);
		});
		
		var prevSnapshot = visitStarts[snapshot.socketID];
		var distance = utils.getDistance(
			[prevSnapshot.latitude, prevSnapshot.longitude],
			[snapshot.latitude, snapshot.longitude]
		);
		var timeDiff = utils.timeDifference(prevSnapshot.time, snapshot.time);
		
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
	});

	// client.on("disconnected", function(snapshot) {
	// 	delete currPositions[snapshot.userID];
	// 	delete visitStarts[snapshot.userID];
	// 	io.emit('refreshEvent', visitStarts);
	// });
});