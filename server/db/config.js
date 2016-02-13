// This file exports a function that returns a Sequelize connection
// to a specific database (local or deployed), as designated by dbEnv

var DEPLOYED_DB = {
  url: "postgres://xcjdlmsnudlseg:6V2Hd0n_ICoe-ZhVlYx2jCSDk5@ec2-54-225-199-245.compute-1.amazonaws.com:5432/df5pdun0nqbaat",
  options: { dialect: 'postgres', dialectOptions: { ssl: true }, logging: false }
};
var LOCAL_DB = {
  name: 'pinpointdb',
  username: 'postgres',
  password: '',
  options: { dialect: 'postgres', logging: false }
};

var logStatus = function(dbEnv, dbUrlOrName) {
  console.log('Database configured to run from', dbEnv, 'environment...');
  console.log('Database will connect to:', dbUrlOrName);
};

// Sequelize = the Sequelize npm module
// dbEnv = 'automatic' || 'production' || 'development'
module.exports = function(Sequelize, dbEnv) { 
  if (dbEnv === 'automatic' && process.env.DATABASE_URL) {
    logStatus(dbEnv, process.env.DATABASE_URL);
    return new Sequelize(process.env.DATABASE_URL);
  } else if (dbEnv === 'production') {
    logStatus(dbEnv, DEPLOYED_DB.url);
    return new Sequelize(DEPLOYED_DB.url, DEPLOYED_DB.options);
  } else {
    logStatus(dbEnv, LOCAL_DB.name);
    return new Sequelize(LOCAL_DB.name, LOCAL_DB.username, LOCAL_DB.password, LOCAL_DB.options);
  }
};