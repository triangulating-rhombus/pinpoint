
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db/dbModel');
var controller = require('./controller');
var visitHelper = require('./visit');
var jwt = require('jwt-simple');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
var io = require('socket.io').listen(server);

db.init();
// app.get('/socket', function(req, res) {
//   res.send('hello world');

var allUsers = {};
var usersTracker = {};

/* *******  
LOGIN & SIGNUP API ROUTES 
   *******
*/

app.post('/login', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;

	// Get this promisified so it's not so messy 
  controller.authenticateUser(username, password, function(err, match){
  	if (err) { // err is a string describing the error
  		res.status(401).json({error: err});
  	} else {
  		//send back some sort of identifier
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
	}

	controller.findUser(userObj).then(function(user){
		if(user){
			res.status(401).json({error: "user already exists!"});
		} else {
			controller.addUser(userObj);
			// do we need to send them a JWT? i think we only send it on login
			var token = jwt.encode(username, 'secret');
  		res.json({token:token})
		}
	});
});


/* ***** 
	SOCKETS FOR USER GEOLOCATION UPDATES 
***** */
io.on('connection', function(client) {

	console.log("Client connected!");
	client.on("connected", function(data) {

	// On initial connection, check for JWT match. 
	// if match, then allow access to below. If not, then send an error 


	var username = jwt.decode(data.token, "secret");
	controller.findUser({username:username}).then(function(user){
		if(user){
			data.userID = user.id;
			allUsers[data.socketID] = data; 
			usersTracker[data.socketID] = data;
			io.emit('refreshEvent', allUsers);

		}else {
			io.emit('error', 'username not found');
		}
	});

		
	})
	// client.on("disconnected", function(data) {
	// 	delete usersTracker[data.userID];
	// 	delete allUsers[data.userID];
	// 	io.emit('refreshEvent', allUsers);
	// })
	client.on("update", function(data) {

		var userID = allUsers[data.socketID].userID;

		usersTracker[data.socketID] = data;
		var previousData = allUsers[data.socketID];
		var distance = visitHelper.getDistance([previousData.latitude, previousData.longitude],[data.latitude, data.longitude]);
		var timeDiff = visitHelper.timeDifference(previousData.time, data.time);
		if (distance >= 10 && timeDiff >= 3){
			previousData.endTime = new Date();
			controller.addVisit(previousData).then(function(obj){
				console.log(userID, obj[0].dataValues.id);
				controller.addTagsVisits(userID, obj[0].dataValues.id);
			});
			allUsers[data.socketID] = data;
		}else if (distance < 10 && timeDiff < 10){
			allUsers[data.socketID] = previousData;
		}else if (distance > 10 && timeDiff < 10){
			allUsers[data.socketID] = data;
		}
		// controller.getHotSpots("soccer").then(function(data){
		// 	console.log(data);
		// });
		
		io.emit('refreshEvent', usersTracker);
	})

})

//})

// });
