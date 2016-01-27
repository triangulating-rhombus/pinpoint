var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db/dbModel');
var controller = require('./controller');
var visitHelper = require('./visit');

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

io.on('connection', function(client) {
	console.log("Client connected!");

	client.on("connected", function(data) {
		console.log(data.userID + " has connected!")
		var id = data.userID;
		allUsers[id] = data;
		usersTracker[id] = data;
		//console.log(new Date(allUsers[1].time))

		io.emit('refreshEvent', allUsers);

		controller.addUser(data.userID).then(function(){
		});

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
			controller.addVisit(previousData).then(function(){
				console.log("inserted visit");
			});
			controller.addVisit(previousData).then(function(){
				console.log("inserted visit");
			});
			allUsers[data.userID] = data;
		}else if (distance < 10 && timeDiff < 10){
			allUsers[data.userID] = previousData;
		}else if (distance > 10 && timeDiff < 10){
			allUsers[data.userID] = data;
		}



		io.emit('refreshEvent', usersTracker);
	})

})


//})

// });

