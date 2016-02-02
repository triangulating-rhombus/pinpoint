import { UPDATE_SETTINGS } from '../constants/actionTypes';
import updateSettings from '../actions/action_update_settings';

const INITIAL_STATE = {
  tag1: '',
  tag2: '',
  tag3: '',
  isBroadcasting: null
};

export default function(state=INITIAL_STATE, action){

  switch(action.type) {
    case UPDATE_SETTINGS: 
      return action.payload;
    default:
      return state;
  }
}
