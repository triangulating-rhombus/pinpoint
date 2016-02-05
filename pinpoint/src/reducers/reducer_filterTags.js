import updateTags from "../actions/action_filter_by_tags.js";
import { FILTER_BY_TAGS } from '../constants/actionTypes';

export default function(state = {}, action) {
  switch(action.type){
    case FILTER_BY_TAGS:
      return action.payload;
    default:
    return state;
  }
}