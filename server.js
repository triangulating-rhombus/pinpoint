var express = require('express');
var app = express();

var db = require('./db/dbModel');

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

db.init();
app.get('/', function(req, res) {
  res.send('hello world');
});