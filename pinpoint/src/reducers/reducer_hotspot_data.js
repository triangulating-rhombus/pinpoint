import { UPDATE_HOTSPOTS } from '../constants/actionTypes';

const INITIAL_STATE = {
  data: [],
  isVisible: false
};

export default function(state = [], action) {
  switch(action.type) {
    case UPDATE_HOTSPOTS:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
} 