var model = require('./db/dbModel');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var geocoder = require('node-geocoder');
var http = require('http');

var getHotSpots = function (tag) {
  return model.Tags.findAll({ 
    where: {
      name: tag
    },
    include: [ model.Visits ]
  }).then(function(locations) {

    var visits = locations[0].dataValues.Visits;
    visits = visits.map(function(visit){
      //return visit.dataValues;
      var latitude = visit.dataValues.latitude;
      var longitude = visit.dataValues.longitude;
      return {latitude:latitude, longitude:longitude};
    });
    return visits;
  })
};

var authenticateUser = function(username, attemptedPassword, callback){
  console.log('username and password from client:', username, attemptedPassword);

  model.Users.findOne({where: {username: username}}).then(function(user){
    if (!user) {
      callback('User not found', null);
      return;
    }

    bcrypt.compare(attemptedPassword, user.password, function(err, isMatch){
        // if(err){
        //   callback(err, null);
        // } else{
        //   callback(null, isMatch);
        // }

        callback(err, isMatch);

    });
  });
};

var hashPassword = function(password){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(password, null, null);
}

var addUser = function (user) {
  return hashPassword(user.password).then(function(hashed){
    return model.Users
        .findOrCreate({where: {id: user.userID, username: user.username, password: hashed}})

  });
}

// finduser to find if a user already exists 
var findUser = function(user){
  return model.Users.findOne({where: {username: user.username}})


  // return model.Users
  //   .findOrCreate({where: {id: user.userID, username: user.username, password: }})
    // .spread(function(user, created) {
    //   console.log(user.get({
    //     plain: true
    //   }))
    //   console.log(created)

    // })
};

var geocoderProvider = 'google';
var httpAdapter = 'https';

var extra = {
    apiKey: 'AIzaSyCtsxXD-6Dl-dCzmvSDneXFvCknDYJ3GGA',
    formatter: null
};

geocoder = geocoder(geocoderProvider, httpAdapter, extra);

const geoCodeThis = () => {
  geocoder.reverse({lat:37.782377, lon:-122.410168}, function(err, res) {
      console.log(res[0].formattedAddress);
  })
}

var addVisit = function (visit) {
  return geocoder.reverse({lat:visit.latitude, lon:visit.longitude})
    .then(function(loc){
  return model.Visits
    .findOrCreate({where: {latitude: visit.latitude, longitude: visit.longitude, address: loc[0].formattedAddress, 
      startTime: visit.time, endTime: visit.endTime}})
  })
};

var addTag = function (tags) {

return Promise.map(tags, function(tag) {
    // Promise.map awaits for returned promises as well.
    return model.Tags.findOrCreate({where: {name: tag}})
})


};

var addTagsVisits = function(visit, visitID){
  var tagsList = visit.tags;
  for (var i = 0; i < tagsList.length; i++){
    var tag = tagsList[i];
    model.Tags.findOne({ where: {name: tag} }).then(function(project) {
      var tagID = project.dataValues.id;

      model.tags_visits.findOrCreate({where: {
        tag_id: tagID,
        visit_id: visitID
      }})

      // var visit_tag = model.tags_visits.build({
      //   tag_id: tagID,
      //   visit_id: visitID
      // })

      // visit_tag.save().then(function() {
      //   console.log("saved: " + tagID);
      // })

    })
  }
}

var addTagsUsers = function(tags, userID){

  model.tags_users.destroy({
      where: {
        id: userID
      }
  })

  for (var i = 0; i < tags.length; i++){
    var tag = tags[i];
    model.Tags.findOne({ where: {name: tag} }).then(function(project) {
      var tagID = project.dataValues.id;

      model.tags_users.findOrCreate({where: {
        tag_id: tagID,
        user_id: userID
      }})

      // var user_tag = model.tags_users.build({
      //   tag_id: tagID,
      //   user_id: userID
      // })

      // user_tag.save().then(function() {
      //   console.log("saved: " + tagID);
      // })

    })
  }
}

module.exports = {
  addUser: addUser,
  addVisit: addVisit,
  addTag: addTag,
  addTagsVisits:addTagsVisits,
  addTagsUsers:addTagsUsers,
  getHotSpots:getHotSpots,
  authenticateUser:authenticateUser,
  findUser:findUser,
  geoCodeThis:geoCodeThis
};