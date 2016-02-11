import { SET_TAG } from './constants';

import updateHotspots from './action_update_hotspots';

function setTag(tagName) {
  return {
    type: SET_TAG,
    payload: tagName
  }
}

export default (tag) => {
  return (dispatch) => {
    dispatch(setTag(tag));
    dispatch(updateHotspots(tag));
  }
}