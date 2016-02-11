import { REDIRECT_PAGE } from './constants';

export default function (navigator, routeId) {
  navigator.push({id: routeId});
  return {
    type: REDIRECT_PAGE,
    payload: routeId
  };
};
