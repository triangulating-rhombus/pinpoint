// Exports a function that creates and returns an object of Sequelize models
// sequelize = a Sequelize connection to a database
module.exports = function(sequelize) {
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

  Tags.belongsToMany(Users, { through: 'tags_users', foreignKey: 'tag_id' });
  Users.belongsToMany(Tags, { through: 'tags_users', foreignKey: 'user_id' });

  Tags.belongsToMany(Visits, { through: 'tags_visits', foreignKey: 'tag_id' });
  Visits.belongsToMany(Tags, { through: 'tags_visits', foreignKey: 'visit_id' });

  return {
    Users: Users,
    Visits: Visits,
    Tags: Tags,
    tags_users: tags_users,
    tags_visits: tags_visits
  };
};