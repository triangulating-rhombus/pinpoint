var geolib = require('geolib');

exports.getDistance = function(pos1, pos2) {
  return geolib.getDistance(
    { latitude: pos1[0], longitude: pos1[1] },
    { latitude: pos2[0], longitude: pos2[1] },
    1 // get accuracy within this number of meters
  );
};

exports.getTimeDifference = function(time1, time2){
  return Math.abs((new Date(time1) - new Date(time2)) / 1000);
};

// Returns a value within number +/- range
exports.getRandomNumberWithinRange = function(number, range) {
  return number + (Math.random() * range * 2) - range;
};