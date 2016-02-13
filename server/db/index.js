var Sequelize = require('sequelize');

// Connect to either deployed or local database (edit config.js to specify)
var sequelize = require('./config')(Sequelize);

// (If nonexistent, create and) return database tables as Sequelize models
var models = require('./schemas')(sequelize);

sequelize.sync();

module.exports = models;