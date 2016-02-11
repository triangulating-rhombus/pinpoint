import { REDIRECT_PAGE } from '../actions/constants';

export default (state = null, action) => {
  switch(action.type) {
    case REDIRECT_PAGE:
      return action.payload;
    default:
      return state;
  }
};