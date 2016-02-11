var USE_DEPLOYED_DB = false; // set this to true to use tr-pinpoint-server Heroku app's database

var LOCAL_DB = {
  name: 'pinpointdb',
  username: 'postgres',
  password: '',
  options: { dialect: 'postgres', logging: false }
};
var DEPLOYED_DB = {
  url: "postgres://xcjdlmsnudlseg:6V2Hd0n_ICoe-ZhVlYx2jCSDk5@ec2-54-225-199-245.compute-1.amazonaws.com:5432/df5pdun0nqbaat",
  options: { dialect: 'postgres', dialectOptions: { ssl: true }, logging: false }
};

var Sequelize = require('sequelize');

// Connect to either deployed or local database
var sequelize = null;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else if (USE_DEPLOYED_DB) {
  sequelize = new Sequelize(DEPLOYED_DB.url, DEPLOYED_DB.options);
} else {
  sequelize = new Sequelize(LOCAL_DB.name, LOCAL_DB.username, LOCAL_DB.password, LOCAL_DB.options);
}

// Define schemas
var Users = sequelize.define('Users', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: {type: Sequelize.STRING, unique: true, notNull: true},
  password: {type: Sequelize.STRING, notNull: true},
  broadcast: {type: Sequelize.BOOLEAN, notNull: true}
}, { timestamps: false });

var Visits = sequelize.define('Visits', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  latitude: { type: Sequelize.DOUBLE, unique: false, notNull: true },
  longitude: { type: Sequelize.DOUBLE, unique: false, notNull: true },
  startTime: { type: Sequelize.DATE, unique: false, notNull: true },
  endTime: { type: Sequelize.DATE, unique: false, notNull: false },
  address: { type: Sequelize.STRING, unique: false, notNull: false }
}, { timestamps: false });

var Tags = sequelize.define('Tags', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, notNull: true, unique: true }
}, { timestamps: false });

var tags_users = sequelize.define('tags_users', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  tag_id: { type: Sequelize.INTEGER, notNull: true},
  user_id: { type: Sequelize.INTEGER, notNull: true}
}, { timestamps: false });

var tags_visits = sequelize.define('tags_visits', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  tag_id: { type: Sequelize.INTEGER, notNull: true},
  visit_id: { type: Sequelize.INTEGER, notNull: true}
}, { timestamps: false });

// Initialize database
var init = function() {
  Tags.belongsToMany(Users, { through: 'tags_users', foreignKey: 'tag_id' });
  Users.belongsToMany(Tags, { through: 'tags_users', foreignKey: 'user_id' });

  Tags.belongsToMany(Visits, { through: 'tags_visits', foreignKey: 'tag_id' });
  Visits.belongsToMany(Tags, { through: 'tags_visits', foreignKey: 'visit_id' });

  sequelize.sync();
};

exports.Users = Users;
exports.Visits = Visits;
exports.Tags = Tags;
exports.tags_users = tags_users;
exports.tags_visits = tags_visits;
exports.init = init;