var ALLOWED_DISTANCE = 10; // in meters
var geolib = require('geolib');

var getDistance = function(pos1, pos2) {
  return geolib.getDistance(
    { latitude: pos1[0], longitude: pos1[1] },
    { latitude: pos2[0], longitude: pos2[1] },
    1 // get accuracy within this number of meters
  );
};

var timeDifference = function(time1, time2){
	return Math.abs((new Date(time1) - new Date(time2))/1000)
}




module.exports = {
  getDistance: getDistance,
  timeDifference: timeDifference
};