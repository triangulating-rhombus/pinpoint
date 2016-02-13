// Uncomment one of the following lines:
var DB_ENV = 'automatic'; // use whichever db the server is running from
// var DB_ENV = 'production'; // use deployed db on Heroku

var Sequelize = require('sequelize');

// Connect to either deployed or local database
var sequelize = require('./config')(Sequelize, DB_ENV);

// (If nonexistent, create and) return database tables as Sequelize models
var models = require('./schemas')(sequelize);

sequelize.sync();

module.exports = models;