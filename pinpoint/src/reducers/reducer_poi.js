const DEFAULT_LATITUDE = 37.331177;
const DEFAULT_LONGITUDE = -122.031641;

import { SET_POI } from '../constants/actionTypes';

const INITIAL_STATE = {
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  tag: null,
  stats: { warning: 'NOT_LOADED' },
  friendlyExplanation: 'Loading...'
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
  case SET_POI:
    return action.payload;
  default:
    return state;
  }
};