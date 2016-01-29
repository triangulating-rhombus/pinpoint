var model = require('./db/dbModel');
var Promise = require('bluebird');

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
    .findOrCreate({where: {latitude: visit.latitude, longitude: visit.longitude, startTime: visit.time, endTime: visit.endTime}})
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
  getHotSpots:getHotSpots
};