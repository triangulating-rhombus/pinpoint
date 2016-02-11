import { UPDATE_MARKERS } from './constants';

export default function(currSnapshots) {
  return {
    type: UPDATE_MARKERS,
    payload: currSnapshots
  }
}

