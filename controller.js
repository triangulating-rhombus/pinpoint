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
    .findOrCreate({where: {latitude: visit.latitude, longitude: visit.longitude, startTime: visit.time, endTime: visit.endTime}})
};

var addTag = function (tags) {
  for (var i = 0; i < tags.length; i++){
    model.Tags
    .findOrCreate({where: {name: tags[i]}})
  }
};

var addTagsVisits = function(visit, visitID){
  var tagsList = visit.tags;
  for (var i = 0; i < tagsList.length; i++){
    var tag = tagsList[i];
    model.Tags.findOne({ where: {name: tag} }).then(function(project) {
      var tagID = project.dataValues.id;

      var visit_tag = model.tags_visits.build({
        tag_id: tagID,
        visit_id: visitID
      })

      visit_tag.save().then(function() {
        console.log("saved: " + tagID);
      })

    })
  }
}

module.exports = {
  addUser: addUser,
  addVisit: addVisit,
  addTag: addTag,
  addTagsVisits:addTagsVisits
};