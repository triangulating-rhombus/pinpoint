import { CHECK_USER } from '../constants/actionTypes';
import checkUser from '../actions/checkUserAction';


export default function (state = {}, action) {
  switch(action.type) {
    case CHECK_USER:
      return {...state, username: action.payload.username, password: action.payload.password };
    default:
      return state;
  }
}





