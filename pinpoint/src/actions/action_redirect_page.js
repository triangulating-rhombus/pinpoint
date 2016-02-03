import { REDIRECT_PAGE } from '../constants/actionTypes';

export default function (navigator, routeId) {
  navigator.push({id: routeId});
  return {
    type: REDIRECT_PAGE,
    payload: routeId
  };
};
