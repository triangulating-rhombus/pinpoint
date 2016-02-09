import { DISPLAY_HOTSPOTS } from '../constants/actionTypes';

export default function(state = [], action) {
  switch(action.type){
    case DISPLAY_HOTSPOTS:
      return action.payload;
    default:
      return state;
  }
} 