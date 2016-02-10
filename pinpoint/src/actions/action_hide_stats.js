import { HIDE_STATS } from '../constants/actionTypes';

export default function hideStats() {
  console.log('hiding stats');
  return {
    type: HIDE_STATS
  }
}