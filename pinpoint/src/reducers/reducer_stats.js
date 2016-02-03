import { GET_STATS } from '../constants/actionTypes';
import getStats from '../actions/action_get_stats';

// can describe structure in more detail
const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_STATS: 
      return action.payload;
    default:
      return state;
  }
};