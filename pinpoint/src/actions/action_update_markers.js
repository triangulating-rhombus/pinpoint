import { UPDATE_MARKERS } from '../constants/actionTypes';

export default function(currSnapshots) {
  return {
    type: UPDATE_MARKERS,
    payload: currSnapshots
  }
}

