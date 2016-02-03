import { UPDATE_GEO_LOCATION } from '../constants/actionTypes';

export default function(allUsers){
  console.log("I am inside the update action");
  return {
    type: UPDATE_GEO_LOCATION,
    payload: allUsers
  }
}

