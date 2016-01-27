var model = require('./db/dbModel');
var Promise = require('bluebird');

var addUser = function (user) {
  return model.Users
    .findOrCreate({where: {id: user}})
    // .spread(function(user, created) {
    //   console.log(user.get({
    //     plain: true
    //   }))
    //   console.log(created)

    // })
};

var addVisit = function (visit) {
  return model.Visits
    .findOrCreate({where: {id: visit.id, latitude: visit.latitude, longitude: visit.longitude, startTime: visit.time}})
};

module.exports = {
  addUser: addUser,
  addVisit: addVisit
};