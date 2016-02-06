var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var db = require('./db/dbModel');
var controller = require('./controller');

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

	controller.visitStats(lat, lon, tag)
	.then(function(result){
		res.json(result);
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

// 	      var random = {token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IndheW5lIg.66Qxc0MBJv_cJyvP8WfiEUCZZ4X1BXBSghVQVuAgBTA", 
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