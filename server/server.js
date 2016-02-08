require('newrelic');

var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var db = require('./db/dbModel');
var controller = require('./controller');
var _ = require('underscore');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

db.init();

// Helper to send AJAX response with errorMessage
var respondWithError = function(res, errorMessage) {
  res.status(401).json({ error: errorMessage });
};

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
			res.status(401).json({error: 'user already exists!'});
		} else {
			controller.addUser(userObj).then(function(){
				var token = jwt.encode(username, 'secret');
	  		res.json({token:token})
			});
		}
	});
});

/* ***** 
	Settings
***** */

app.post('/settings', function (req, res) {
	var token = req.headers['x-access-token'];
	if (!token) {
		respondWithError(res, 'Missing token: no x-access-token header was provided');
	}
	try {
		var user = jwt.decode(token, 'secret');
		var tagNames = _.filter([ req.body.tag1, req.body.tag2, req.body.tag3 ], function(tag){return tag !== ""});
		var isBroadcasting = req.body.isBroadcasting;

		var userID = null;
		controller.findUser({ username: user })
		.then(function(user) {
			userID = user.id;
			return controller.addTag(tagNames);
		})
		.then(function(results) {
			var tagIDs = results.map(function(tag) {
				return tag[0].dataValues.id;
			});
			controller.addTagsUsers(tagIDs, userID).then(function(){
				res.status(201).json({ success: 'Updated tags: ' + tagNames.join(', ') });
			}); // this doesn't return a promise
			
		})
		.catch(function(error) {
			respondWithError(res, 'Invalid token: ' + error.message);
		});

		controller.setBroadcast(user, isBroadcasting);
	} catch(error) {
		respondWithError(res, 'Invalid token: ' + error.message);
	}
});

app.get('/settings', function (req, res) {
	var token = req.headers['x-access-token'];
	if (!token) {
		respondWithError(res, 'Missing token: no x-access-token header was provided');
		return;
	}
	try {
		var user = jwt.decode(token, 'secret');
		controller.findSettings(user)
		.then(function(result) {
			res.send(result);
		})
		.catch(function(error) {
			respondWithError(res, 'Invalid token: ' + error.message);
		});
	} catch(error) {
		respondWithError(res, 'Invalid token: ' + error.message);
	}
});

/* ***** 
	Hotspots
***** */

app.get('/hotspot', function (req, res) {
	var tag = req.headers['tag']; 

	controller.getHotSpots(tag, function(result){
		res.json(result);
	})

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

	controller.visitStats(lat, lon, tag) // returns the object to send to client
	.then(function(responseBody) {
		console.log('responseBody from visitStats:', responseBody);
		if (responseBody.error) {
			respondWithError(res, responseBody.error);
		} else {
			res.json(responseBody);
		}
	});
});

// setInterval(function(){
// 	for (var i = 0; i < 5; i++){

// 	      var sign = Math.random() > 0.5? -1: 1;
// 	      var lon = -122.031641 + sign * Math.random() * .002;
// 	      sign = Math.random() > 0.5? -1: 1;
// 	      var lat = 37.331177 + sign * Math.random() * .002;
// 	      var time = new Date();
// 	      time.setDate(time.getDate() + Math.floor(Math.random() * (7)));

// 	      var random = {token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IndheW5lIg.66Qxc0MBJv_cJyvP8WfiEUCZZ4X1BXBSghVQVuAgBTA', 
// 	      socketID: null, longitude: lon, latitude: lat, time: time, endTime: time};

// 	      controller.addVisit(random).then(function(obj){
	        
// 	        controller.addTagsVisits(1, obj[0].dataValues.id);
// 	      });
// 	}
// }, 1500)


/* ***** 
	Socket for user geolocation updates
***** */

var serverSocket = require('./socket')(server, true); // true will include fake users

module.exports = server
