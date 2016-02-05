var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var db = require('./db/dbModel');
var controller = require('./controller');
var visitHelper = require('./visit');

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

	controller.visitStats(lat, lon, tag)
	.then(function(result){
		console.log('got POST to /stats:', lat, lon, tag);
		res.json(result);
	});
});


/* ***** 
	Sockets for user geolocation updates
***** */
// Constants
var MIN_VISIT_LENGTH = 3; // seconds stopped in one location to count as a visit
var ALLOWED_DISTANCE = 10; // feet away from last position to count as at the same place

// Each object stores one entry for each connected user
// socketID: position
var visitStarts = {};
var currPositions = {};

var io = require('socket.io').listen(server);
io.on('connection', function(client) {

	// On initial connection, check for JWT match
	// if match, then allow access to below. If not, then send an error
	client.on("connected", function(data) {
		console.log("Client connected with socketID:", data.socketID);
		var username = jwt.decode(data.token, "secret");
		controller.findUser({ username: username })
		.then(function(user) {
			if (user) {
				data.userID = user.id;
				visitStarts[data.socketID] = data;
				currPositions[data.socketID] = data;
				io.emit('refreshEvent', currPositions);
			} else {
				io.emit('error', 'username not found');
			}
		});
	});

	// client.on("disconnected", function(data) {
	// 	delete currPositions[data.userID];
	// 	delete visitStarts[data.userID];
	// 	io.emit('refreshEvent', visitStarts);
	// });

	client.on("update", function(data) {
		var userID = visitStarts[data.socketID].userID;
		controller.findUserTags(userID)
		.then(function(tags) {
			data.tags = tags;
			data.userID = userID;
			currPositions[data.socketID] = data;
			io.emit('refreshEvent', currPositions);
		});
		
		var previousData = visitStarts[data.socketID];
		var distance = visitHelper.getDistance([previousData.latitude, previousData.longitude],[data.latitude, data.longitude]);
		var timeDiff = visitHelper.timeDifference(previousData.time, data.time);
		
		// If visit of over MIN_VISIT_LENGTH seconds has just ended
		if (distance >= ALLOWED_DISTANCE && timeDiff >= MIN_VISIT_LENGTH) {
			previousData.endTime = new Date();
			controller.addVisit(previousData).then(function(obj) {
				controller.addTagsVisits(userID, obj[0].dataValues.id);
			});
			visitStarts[data.socketID] = data;

		} else if (distance < ALLOWED_DISTANCE && timeDiff < 10) {
			// do not update
			visitStarts[data.socketID] = previousData;

		} else if (distance > ALLOWED_DISTANCE && timeDiff < 10) {
			// reset visit start to current data
			visitStarts[data.socketID] = data;
		}
		// controller.getHotSpots("soccer").then(function(data){
		// 	console.log(data);
		// });
	});
});