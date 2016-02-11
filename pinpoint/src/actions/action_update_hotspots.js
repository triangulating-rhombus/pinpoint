import { UPDATE_HOTSPOTS } from '../constants/actionTypes';
import { sendRequest } from './utils';

function updateHotspots(hotspots) {
  return {
    type: UPDATE_HOTSPOTS,
    payload: hotspots
  }
}

export default function getHotspots(tag) {
  return (dispatch) => {
    sendRequest('GET', '/hotspot', null, { tag })
    .then(
      response => {
        const hotspots = JSON.parse(response._bodyText);
        if (response.status === 200) {
          dispatch(updateHotspots(hotspots));
        }
      },
      error => {

      }
    );
  };
}