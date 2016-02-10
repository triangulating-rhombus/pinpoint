import { SET_TAG } from '../constants/actionTypes';

export default function setTag(tagName) {
  return {
    type: SET_TAG,
    payload: tagName
  }
}