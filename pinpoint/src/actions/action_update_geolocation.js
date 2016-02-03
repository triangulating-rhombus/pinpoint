import { UPDATE_GEO_LOCATION } from '../constants/actionTypes';

export default function(allUsers){
  return {
    type: UPDATE_GEO_LOCATION,
    payload: allUsers
  }
}

