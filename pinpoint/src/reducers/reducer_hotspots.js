import { UPDATE_HOTSPOTS } from '../constants/actionTypes';

const INITIAL_STATE = {
  data: [],
  warning: null,
  isVisible: false
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case UPDATE_HOTSPOTS:
      console.log(action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
} 