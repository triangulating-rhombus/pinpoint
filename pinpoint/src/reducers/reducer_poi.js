import { SET_POI } from '../constants/actionTypes';

const INITIAL_STATE = {
  latitude: null,
  longitude: null
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
  case SET_POI:
    return action.payload;
  default:
    return state;
};