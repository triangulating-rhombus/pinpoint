var ALLOWED_DISTANCE = 100; // feet

//assume position is a 2-tuple: [latitude, longitude]
//assume data is an array of objects

var User = function() {
  this.currVisit = null;
  this.lastPos = null;
  this.currPos = null;
  this.tags = []; // join table
};
User.prototype.updatePosition = function(newPos) {
  this.lastPos = this.currPos;
  this.currPos = newPos;
};
// Called right after updating position to update curr visit
User.prototype.updateCurrentVisit = function() {
  //distance between current position and 5 minutes ago
  var dist = Math.sqrt(
    Math.pow(user.currPos[0] - user.lastPos[0], 2) +
    Math.pow(user.currPos[1] - user.lastPos[1], 2)
  );

  if (dist < ALLOWED_DISTANCE) {
    if (user.currVisit) {
      this.currVisit.endTime = Date.now();
    } else {
    // create a new visit with data from 5 minutes ago
    var newVisit = Visit();
    newVisit.pos = user.lastPos;
    newVisit.startTime = Date.now(); // TODO: subtract five minutes
    
    user.currVisit = newVisit;
    visits.push(visit);    
  } else {
    if (this.currVisit) {
      this.currVisit = null;
    }
  }
};

var Visit = function(pos, startTime, endTime) {
  this.pos = pos;
  this.startTime = startTime;
  this.endTime = endTime || null;
};

var users = [];
var visits = [];

var getPositionsForTag = function(tag) {
  
};

var getTagsForPosition = function(position) {

};

var getWeekStatsForPositionAndTag = function(position, tag) {

};