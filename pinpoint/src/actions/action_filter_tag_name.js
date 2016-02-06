import {FILTER_BY_SELECTED_TAG} from '../constants/actionTypes';

export default (tag) => {
  return {
    type: FILTER_BY_SELECTED_TAG,
    payload: tag
  }
}