import { SET_POI } from '../constants/actionTypes';

export default function (poi) {
  return {
    type: SET_POI,
    payload: poi
  }
};
