const DEFAULT_LATITUDE = 37.331177;
const DEFAULT_LONGITUDE = -122.031641;

const defaultExplanation = 'Uh oh - something strange happened.';
const explanations = {
  'NOT_LOADED': 'Loading...',
  'NO_VISITS': 'No visits logged for that location!',
  'OVER_QUERY_LIMIT': 'Oh no! Our geocoder\'s daily limit has been reached.',
  'ZERO_RESULTS': 'Sorry - we couldn\'t quite figure out that address. Try another spot?'
}

import { UPDATE_STATS, SHOW_STATS, HIDE_STATS } from '../constants/actionTypes';

const INITIAL_STATE = {
  poi: { latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE },
  address: null,
  visitsByDay: {},
  error: null,
  warning: 'NOT_LOADED',
  explanation: 'Loading...',
  isVisible: false
}

function addExplanation(statsInfo) {
  const { error, warning } = statsInfo;
  if (error || warning) {
    const explanation = explanations[ error || warning ] || defaultExplanation;
    statsInfo.explanation = explanation;
  } else {
    statsInfo.explanation = null;
  }
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_STATS:
      addExplanation(action.payload);
      console.log('Stats about to be updated to:', { ...state, ...action.payload });
      return { ...state, ...action.payload };
    case SHOW_STATS:
      return { ...state, isVisible: true };
    case HIDE_STATS:
      return { ...state, isVisible: false };
    default:
      return state;
  }
}