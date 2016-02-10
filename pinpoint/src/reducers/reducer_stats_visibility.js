import { SHOW_STATS, HIDE_STATS } from '../constants/actionTypes';

export default (state = false, action) => {
  switch(action.type) {
    case SHOW_STATS:
      return true;
    case HIDE_STATS:
      return false;
    default:
      return state;
  }
}