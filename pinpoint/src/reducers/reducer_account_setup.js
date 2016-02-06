import accountSetup  from "../actions/action_account_setup.js";
import {ACCOUNT_SETUP} from '../constants/actionTypes.js';

export default (state = null, action) => {
  switch (action.type) {
    case ACCOUNT_SETUP:
      return action.payload;
    default: 
      return state;
  }
}

