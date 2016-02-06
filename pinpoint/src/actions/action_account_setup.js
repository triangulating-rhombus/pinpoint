import {ACCOUNT_SETUP} from '../constants/actionTypes.js';

export default (currentUser) => {
  return {
    type: ACCOUNT_SETUP,
    payload: currentUser
  }
} 