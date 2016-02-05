import { TOGGLE_HOTSPOT } from '../constants/actionTypes';
import toggle_hotspot from '../actions/action_toggle_hotspots';

export default function(state = false, action){
  switch(action.type){
    case TOGGLE_HOTSPOT:
      return !state;
    default:
      return state;
  }
}
