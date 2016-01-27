var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db/dbModel');
var controller = require('./controller');

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

io.on('connection', function(client) {
	console.log("Client connected!");

	client.on("connected", function(data) {
		console.log(data.id + " has connected!")
		id = data.id;
		allUsers[id] = data;
		//console.log(new Date(allUsers[1].time))

		io.emit('refreshEvent', allUsers);

		controller.addUser(data.id).then(function(){
			controller.addVisit(data).then(function(){
				console.log(data);
			});
		});

	})

	client.on("disconnected", function(data) {
		delete allUsers[data.username];
		io.emit('refreshEvent', allUsers);
	})

	client.on("update", function(data) {
		allUsers[data.username] = data;
		io.emit('refreshEvent', allUsers);
	})

})


//})

// });

