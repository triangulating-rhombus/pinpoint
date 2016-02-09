import _ from 'underscore';
import { UPDATE_MARKERS } from '../constants/actionTypes';

import React, {
  PropTypes,
  View,
  Text,
  Dimensions,
  Animated,
  Platform, 
} from 'react-native';

// const INITIAL_STATE = {
//   socketID : {
//     pastNewPins: [{latitude:0, longitude:0, tags:[]},{latitude:0, longitude:0}]
//     tags: ['candy','dogs','women']
//   }
// }

function generateNewState(oldState, currSnapshots) {
  var results = {};

  _.each(currSnapshots, (snapshot, socketID) => {

    var oldDataCopy = [];
    if (oldState[socketID]) {
      oldDataCopy = oldState[socketID].pastNewPins.concat([]);   
      if(oldDataCopy.length > 1) {
        oldDataCopy.shift();
      }
    }

    const { latitude, longitude, tags } = snapshot;
    const newPins = new Animated.Region({ latitude, longitude });

    oldDataCopy.push(newPins);
    
    const data = {
      pastNewPins: oldDataCopy,
      tags
    };

    results[socketID] = data;
  });

  return results;
}

export default function(state = {}, action) {
  switch(action.type) {
    case UPDATE_MARKERS:
      return generateNewState(state, action.payload);
    default:
      return state;
  }
}
