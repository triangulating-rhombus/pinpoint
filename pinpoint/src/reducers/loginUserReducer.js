// Might want to import dummy data for users here

import { CHECK_USER } from '../constants/actionType';
import checkUser from '../actions/checkUserAction';

export default function (state = {}, action) {
  switch(action.type) {
    case CHECK_USER:
      return {...state, username:action.payload.username };
    default:
      return state;
  }
}





