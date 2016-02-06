var model = require('./db/dbModel');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var geocoder = require('node-geocoder');
var http = require('http');
var underscore = require('underscore');
var async = require('async');



var authenticateUser = function(username, attemptedPassword, callback){
  model.Users.findOne({where: {username: username}}).then(function(user) {
    if (!user) {
      callback('User not found', null);
      return;
    }

    bcrypt.compare(attemptedPassword, user.password, function(err, match) {
      return match ? callback(null, match) : callback('Invalid password', null);
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
};


var setBroadcast = function(user, status){
  model.Users.findOne({where: {username: user}})
  .then(function(user){
    user.updateAttributes({
      broadcast: status
    })
  })
};

var geocoderProvider = 'google';
var httpAdapter = 'https';

var extra = {
    apiKey: 'AIzaSyDZJzu5MvHz0s6PsokNcMWy03bRpoGiJ74',
    formatter: null
};

geocoder = geocoder(geocoderProvider, httpAdapter, extra);

var getHotSpots = function (tag, callback) {
  return model.Tags.findAll({ 
    where: {
      name: tag
    },
    include: [ model.Visits ]
  }).then(function(locations) {
    if (locations.length === 0){
      callback("no results")
    }

    var visits = locations[0].dataValues.Visits;
    visits = visits.map(function(visit){
      //return visit.dataValues;
      var latitude = visit.dataValues.latitude;
      var longitude = visit.dataValues.longitude;
      var address = visit.dataValues.address;
      return {latitude:latitude, longitude:longitude, address:address};
    });

          result = underscore.countBy(visits, function(location) {
            return location.address;
          });

          result = underscore.map(result, function(count, address){
            return {count: count, address: address}
          }).sort(function(a, b){
            return b.count - a.count;
          }).slice(0, 10);

        async.map(result, geocoder.geocode.bind(geocoder), function(err, results){
          var result = underscore.map(results, function(location){
            return {lon:location[0].longitude, lat: location[0].latitude};
          })
          callback(result);
        });


  })
};


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
    .catch(function(err) {
        console.log(err);
    });

};

var addTag = function (tags) {

return Promise.map(tags, function(tag) {
    // Promise.map awaits for returned promises as well.
    return model.Tags.findOrCreate({where: {name: tag}})
})


};



var addTagsVisits = function(userID, visitID){

  return model.Users.findAll({ 
    where: {
      id: userID
    },
    include: [ model.Tags ]
  }).then(function(tags) {
    var tagIDs = tags[0].Tags.map(function(obj){return obj.dataValues.id});

  return Promise.map(tagIDs, function(tag) {
      // Promise.map awaits for returned promises as well.
      return model.tags_visits.findOrCreate({where: {tag_id: tag, visit_id: visitID}})
  })

  })


  // var tagsList = visit.tags;
  // for (var i = 0; i < tagsList.length; i++){
  //   var tag = tagsList[i];
  //   model.Tags.findOne({ where: {name: tag} }).then(function(project) {
  //     var tagID = project.dataValues.id;

  //     model.tags_visits.findOrCreate({where: {
  //       tag_id: tagID,
  //       visit_id: visitID
  //     }})

  //     // var visit_tag = model.tags_visits.build({
  //     //   tag_id: tagID,
  //     //   visit_id: visitID
  //     // })

  //     // visit_tag.save().then(function() {
  //     //   console.log("saved: " + tagID);
  //     // })

  //   })
  // }
}

var addTagsUsers = function(tags, userID){

  model.tags_users.destroy({
      where: {
        user_id: userID
      }
  })

  for (var i = 0; i < tags.length; i++){
    var tagID = tags[i];
      model.tags_users.findOrCreate({where: {
        tag_id: tagID,
        user_id: userID
      }})
  }
}

var findUserTags = function (userID) {
  return model.Users.findAll({ 
    where: {
      id: userID
    },
    include: [ model.Tags ]
  }).then(function(tags) {

      return (tags[0].dataValues.Tags.map(function(tag){
        return tag.dataValues.name;
      }))
  })
};

var visitStats = function(lat, lon, tag){
  console.log({lat:lat, lon:lon});
  var days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return geocoder.reverse({lat:lat, lon:lon})
    .then(function(loc){
      console.log(loc);
      return model.Visits.findAll({ 
        where: {
          address: loc[0].formattedAddress
        },
        include: [ {model: model.Tags, where: {name: tag}} ]
      }).then(function(visits) {
        console.log("bye");
        console.log(visits);
          var result = visits.map(function(visit){
            return days[visit.dataValues.startTime.getDay()];
          })

          result = underscore.countBy(result, function(day) {
            return day;
          });
          return result;
      })
    }).catch(function(err) {
      console.log("error with geocoder:", err);
      return "could not resolve address";
    });
};

var findSettings = function (username) {

  return model.Users.findAll({ 
    where: {
      username: username
    },
    include: [ model.Tags ]
  }).then(function(tags) {


      var tagsArray = tags[0].dataValues.Tags.map(function(tag){

        return tag.dataValues.name;
      })
      var broadcast = tags[0].dataValues.broadcast;

      return {
        tag1: tagsArray[0],
        tag2: tagsArray[1],
        tag3: tagsArray[2],
        isBroadcasting: broadcast
      };

  })
};




module.exports = {
  addUser: addUser,
  addVisit: addVisit,
  addTag: addTag,
  addTagsVisits:addTagsVisits,
  addTagsUsers:addTagsUsers,
  getHotSpots:getHotSpots,
  authenticateUser:authenticateUser,
  findUser:findUser,
  geoCodeThis:geoCodeThis,
  findUserTags:findUserTags,
  setBroadcast:setBroadcast,
  visitStats:visitStats,
  findSettings:findSettings
};
