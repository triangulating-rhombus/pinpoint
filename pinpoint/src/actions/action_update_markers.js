import { UPDATE_MARKERS } from '../constants/actionTypes';

export default function(allUsers){
  return {
    type: UPDATE_MARKERS,
    payload: allUsers
  }
}

