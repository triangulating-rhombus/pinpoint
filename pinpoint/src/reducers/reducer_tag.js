import { SET_TAG } from '../constants/actionTypes';

export default (state = null, action) => {
  switch(action.type) {
    case SET_TAG:
      return action.payload;
    default:
      return state;
  }
}