import UpdatePins from '../actions/action_update_geolocation';
import { UPDATE_GEO_LOCATION } from '../constants/actionTypes';
import _ from 'underscore';


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
//     tags:['candy','dogs','women']
//   }
// }


export default function(state = {}, action) {

  var test = function(oldstate, data){

    var obj = {};

    _.each(data, (val, user) => {

      // [{},{}]  Same spot in memory
      if(oldstate[user]){
        var oldDataNewArray = oldstate[user].pastNewPins.concat([])      
        
        // Different spot in memory. Now a new Array. Pop Off first index
        if(oldDataNewArray.length > 1){
          oldDataNewArray.shift();
        }

      } else {
        var oldDataNewArray = [];
      }


      let longitude = val.longitude;
      let latitude = val.latitude;

      let newPins = new Animated.Region({
        latitude: latitude,
        longitude: longitude,
      })

      let tags = val.tags;

      // Push New Index
      oldDataNewArray.push(newPins);
      
      
      let data = {
        pastNewPins:oldDataNewArray,
        tags:tags
      }

      obj[user] = data;
    });

    return obj;
  };



  switch(action.type){
    case UPDATE_GEO_LOCATION:
      return test(state, action.payload);
    default:
      return state
  }
}
