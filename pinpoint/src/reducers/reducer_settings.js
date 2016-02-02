import { SUBMIT_SETTINGS } from '../constants/actionTypes';
import updateSettings from '../actions/action_update_settings';


export default function(state=null, action){

  switch(action.type) {
    case UPDATE_SETTINGS: 
      return action.payload;
    default:
      return state;
  }
}
