import currentFilterTag from "../actions/action_filter_tag_name.js";
import { FILTER_BY_SELECTED_TAG } from '../constants/actionTypes';

export default function(state = 'Show All', action) {
  switch(action.type){
    case FILTER_BY_SELECTED_TAG:
      return action.payload;
    default:
    return state;
  }
}