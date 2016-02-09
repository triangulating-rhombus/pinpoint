var model = require('./db/dbModel');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var geocoder = require('node-geocoder');
var http = require('http');
var _ = require('underscore');
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
    // "AIzaSyCtsxXD-6Dl-dCzmvSDneXFvCknDYJ3GGA",
    // 'AIzaSyAzos97uZL22RDdvapJ4UdIci4nk3sRwBA',
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
      callback({ warning: 'NO_HOTSPOTS' });
      return;
    }

    var visits = locations[0].dataValues.Visits;
    visits = visits.map(function(visit){
      //return visit.dataValues;
      var latitude = visit.dataValues.latitude;
      var longitude = visit.dataValues.longitude;
      var address = visit.dataValues.address;
      return {latitude:latitude, longitude:longitude, address:address};
    });

    result = _.countBy(visits, function(location) {
      return location.address;
    });

    result = _.map(result, function(count, address){
      return {count: count, address: address}
    }).sort(function(a, b){
      return b.count - a.count;
    }).slice(0, 10);

  async.map(result, geocoder.geocode.bind(geocoder), function(err, results){
    var result = _.map(results, function(location){
      return {longitude: location[0].longitude, latitude: location[0].latitude};
    })

    callback({ data: result });
  });
  })
};

var addVisit = function (visit) {
  return geocoder.reverse({lat:visit.latitude, lon:visit.longitude})
    .then(function(loc){
  return model.Visits
    .findOrCreate({where: {latitude: visit.latitude, longitude: visit.longitude, address: loc[0].formattedAddress, 
      startTime: visit.time, endTime: visit.endTime}})
  })
    .catch(function(error) {
      //h.log("addVisit error:", error.message);
    });

};

var addTag = function (tags) {

var tags = _.map(_.filter(tags, function(tag){return tag !== "";}), function(tag){
  return tag.toLowerCase();
});

return Promise.map(tags, function(tag) {
    // Promise.map awaits for returned promises as well.
    return model.Tags.findOrCreate({where: {name: tag}})
})


};



var addTagsVisits = function(userID, visitID){

  console.log("addTagsVisits ", userID, " ", visitID);

  return model.Users.findAll({ 
    where: {
      id: userID
    },
    include: [ model.Tags ]
  }).then(function(tags) {
    console.log(tags);
    var tagIDs = tags[0].Tags.map(function(obj){return obj.dataValues.id});
    console.log(tagIDs);

  return Promise.map(tagIDs, function(tag) {
      // Promise.map awaits for returned promises as well.
      return model.tags_visits.findOrCreate({where: {tag_id: tag, visit_id: visitID}})
  })

  })

}

var addTagsUsers = function(tags, userID) {
  console.log("addTagsUsers ", tags, userID);
  model.tags_users.destroy({
    where: { user_id: userID }
  });

  var promiseArr = [];

  for (var i = 0; i < tags.length; i++){
    var tagID = tags[i];
      promiseArr.push(model.tags_users.findOrCreate({where: {tag_id: tagID,user_id: userID}}));
  }

  return Promise.all(promiseArr);


}

// TODO 
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

var visitStats = function(latitude, longitude, tag){
  var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // console.log('getting stats for tag:', tag);
  var address = null;
  return geocoder.reverse({ lat: latitude, lon: longitude }) // geocoder requires properties to be lat/lon
    .then(function(loc) {
      address = loc[0].formattedAddress;
      if (!tag) {
        return model.Visits.findAll({ 
          where: { address: address },
          include: [{
            model: model.Tags
          }]
        });
      } else {
        return model.Visits.findAll({ 
          where: { address: address },
          include: [{
            model: model.Tags,
            where: { name: tag }
          }]
        });
      }
    })
    .then(function(visits) {
      if (visits.length === 0) {
        return { address: address, warning: 'NO_VISITS' };
      }

      // initialize empty visitsByDay object
      var visitsByDay = _.reduce(dayNames, function(acc, dayName) {
        acc[dayName] = 0;
        return acc;
      }, {});
      
      // populate it with frequencies
      visitsByDay = _.reduce(visits, function(acc, visit) {
        var dayOfVisit = dayNames[visit.dataValues.startTime.getDay()];
        acc[dayOfVisit]++;
        return acc;
      }, visitsByDay);

      return { address: address, visitsByDay: visitsByDay };
    })
    .catch(function(error) {
      var errorMessage = 'UNKNOWN';
      if (error.message.indexOf('OVER_QUERY_LIMIT') > -1) {
        errorMessage = 'OVER_QUERY_LIMIT';
      } else if (error.message.indexOf('ZERO_RESULTS') > -1) {
        errorMessage = 'ZERO_RESULTS';
      }
      h.log(error.message);
      return { error: errorMessage };
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
  findUserTags:findUserTags,
  setBroadcast:setBroadcast,
  visitStats:visitStats,
  findSettings:findSettings
};
