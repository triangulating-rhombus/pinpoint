// Exports a function that returns a Sequelize connection
// to a specific database (local or deployed), as designated by DB_ENV

// Set the DB_ENV:
//   'automatic': use whichever db the server is running from
//   'production': use the deployed db on Heroku, even if on the local server
var DB_ENV = 'automatic';

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

var logStatus = function(dbUrlOrName) {
  console.log('Database configured to run from', DB_ENV, 'environment...');
  console.log('Database will connect to:', dbUrlOrName);
};

// Sequelize = the npm module
module.exports = function(Sequelize) { 
  if (DB_ENV === 'automatic' && process.env.DATABASE_URL) {
    logStatus(process.env.DATABASE_URL);
    return new Sequelize(process.env.DATABASE_URL);
  } else if (DB_ENV === 'production') {
    logStatus(DEPLOYED_DB.url);
    return new Sequelize(DEPLOYED_DB.url, DEPLOYED_DB.options);
  } else {
    logStatus(LOCAL_DB.name);
    return new Sequelize(LOCAL_DB.name, LOCAL_DB.username, LOCAL_DB.password, LOCAL_DB.options);
  }
};