var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db/dbModel');
var controller = require('./controller');
var visitHelper = require('./visit');
var jwt = require('jwt-simple');


app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
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

app.post('/login', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;

	// Get this promisified so it's not so messy 
  controller.authenticateUser(username, password, function(err, match){
  	if(match){
  		//send back some sort of identifier
  		var token = jwt.encode(username, 'secret')
  		res.json({token:token})
  	} else {
  		res.json("Invalid user credentials!")
  		}
  });
});

app.post('/signup', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	var userObj = {
		// for wayne: do we need userID here? PostGres will auto-gen right?
		username: username,
		password: password
	}

	controller.findUser(userObj).then(function(user){
		if(user){
			res.json("user already exists!");
		}else {
			controller.addUser(userObj);
			// do we need to send them a JWT? 
		}
	});
});


io.on('connection', function(client) {

	console.log("Client connected!");
	client.on("connected", function(data) {
		controller.addTag(data.tags).then(function(){
			controller.addUser(data).then(function(){
				controller.addTagsUsers(data.tags, data.userID);
					//controller.authenticateUser("Wayne", "hello", function(match){console.log(match)});
			});
		});
		console.log(data.userID + " has connected!")
		var id = data.userID;
		allUsers[id] = data;
		usersTracker[id] = data;
		//console.log(new Date(allUsers[1].time))
		io.emit('refreshEvent', allUsers);
	})
	client.on("disconnected", function(data) {
		delete usersTracker[data.userID];
		delete allUsers[data.userID];
		io.emit('refreshEvent', allUsers);
	})
	client.on("update", function(data) {
		usersTracker[data.userID] = data;
		var previousData = allUsers[data.userID];
		var distance = visitHelper.getDistance([previousData.latitude, previousData.longitude],[data.latitude, data.longitude]);
		var timeDiff = visitHelper.timeDifference(previousData.time, data.time);
		if (distance >= 10 && timeDiff >= 10){
			previousData.endTime = new Date();
			controller.addVisit(previousData).then(function(obj){
				controller.addTagsVisits(previousData, obj[0].dataValues.id);
			});
			allUsers[data.userID] = data;
		}else if (distance < 10 && timeDiff < 10){
			allUsers[data.userID] = previousData;
		}else if (distance > 10 && timeDiff < 10){
			allUsers[data.userID] = data;
		}
		controller.getHotSpots("soccer").then(function(data){
			console.log(data);
		});
		
		io.emit('refreshEvent', usersTracker);
	})

})


//})

// });

