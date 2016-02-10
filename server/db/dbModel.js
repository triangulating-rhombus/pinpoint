var Sequelize = require('sequelize');



// var sequelize = process.env.DATABASE_URL ?
//   new Sequelize(process.env.DATABASE_URL) :
//   new Sequelize(process.env.ENV_DB || 'pinpointdb', 'postgres', '', { dialect: 'postgres', logging: false });


var sequelize = new Sequelize("postgres://xcjdlmsnudlseg:6V2Hd0n_ICoe-ZhVlYx2jCSDk5@ec2-54-225-199-245.compute-1.amazonaws.com:5432/df5pdun0nqbaat", {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

// var sequelize = new Sequelize("postgres://xcjdlmsnudlseg:6V2Hd0n_ICoe-ZhVlYx2jCSDk5@ec2-54-225-199-245.compute-1.amazonaws.com:5432/df5pdun0nqbaat", {
//  dialect: 'postgres',
//  dialectOptions: {
//    ssl: true
//  }
// });

var Visits = sequelize.define('Visits', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  latitude: { type: Sequelize.DOUBLE, unique: false, notNull: true },
  longitude: { type: Sequelize.DOUBLE, unique: false, notNull: true },
  startTime: { type: Sequelize.DATE, unique: false, notNull: true },
  endTime: { type: Sequelize.DATE, unique: false, notNull: false },
  address: { type: Sequelize.STRING, unique: false, notNull: false }
}, { timestamps: false });

var Users = sequelize.define('Users', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: {type: Sequelize.STRING, unique: true, notNull: true},
  password: {type: Sequelize.STRING, notNull: true},
  broadcast: {type: Sequelize.BOOLEAN, notNull: true}
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


var init = function() {

  Tags.belongsToMany(Users, { through: 'tags_users', foreignKey: 'tag_id' });
  Users.belongsToMany(Tags, { through: 'tags_users', foreignKey: 'user_id' });

  Tags.belongsToMany(Visits, { through: 'tags_visits', foreignKey: 'tag_id' });
  Visits.belongsToMany(Tags, { through: 'tags_visits', foreignKey: 'visit_id' });


  // Users.destroy({where: {}}).then(function () {});
   //Visits.destroy({where: {}}).then(function () {});
//Tags.destroy({where: {}}).then(function () {});
   //tags_visits.destroy({where: {}}).then(function () {});
  //tags_users.destroy({where: {}}).then(function () {});


  sequelize.sync();
};



module.exports = {
  Users:Users,
  Visits:Visits,
  Tags:Tags,
  init: init,
  tags_visits: tags_visits,
  tags_users: tags_users

};