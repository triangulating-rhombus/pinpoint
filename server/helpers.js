var ALLOWED_DISTANCE = 100; // feet

//assume position is a 2-tuple: [latitude, longitude]
//assume data is an array of objects

var User = function() {
  this.currVisit = null;
  this.lastPos = null;
  this.currPos = null;
  this.tags = []; // join table
};

var Visit = function() {
  this.pos = null;
};

var users = [];
var visits = [];

// Handler run every 5 minutes to create, update, and end visits
var updateVisits = function() {
  //for each user
    //dist = distance between user.currPos and user.lastPos
    //if dist is less than ALLOWED_DISTANCE
      // if user.currVisit exists
        // update visit's end time to now
      // else
        // set user.currVisit to a new visit with data from last time
        // push the visit to visits
    // else 
      //if user.currVisit exists
        // set user.currVisit to null
};

var getPositionsForTag = function(tag) {
  
};

var getTagsForPosition = function(position) {

};

var getWeekStatsForPositionAndTag = function(position, tag) {

};