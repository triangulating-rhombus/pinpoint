const DEFAULT_LATITUDE = 37.331177;
const DEFAULT_LONGITUDE = -122.031641;

import { UPDATE_STATS, SHOW_STATS, HIDE_STATS } from '../constants/actionTypes';

const INITIAL_STATE = {
  poi: { latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE },
  visitsByDay: {},
  error: null,
  warning: null,
  friendlyExplanation: '',
  isVisible: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_STATS:
      console.log('Stats about to be updated to:', { ...state, ...action.payload });
      return { ...state, ...action.payload };
    case SHOW_STATS:
      return { ...state, isVisible: true };
    case HIDE_STATS:
      return { ...state, isVisible: false };
    default:
      return state;
  }
}