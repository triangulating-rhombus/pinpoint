import { UPDATE_HOTSPOTS } from './constants';
import { sendRequest } from './utils';

function updateHotspots(hotspotsInfo) {
  return {
    type: UPDATE_HOTSPOTS,
    payload: hotspotsInfo
  }
}

export default function getHotspots(tag) {
  return (dispatch) => {
    sendRequest('GET', '/hotspots', null, { tag })
    .then(
      response => {
        const hotspots = JSON.parse(response._bodyText);
        console.log('hotspots response:', hotspots);
        const { warning, data } = hotspots;
        dispatch(updateHotspots({ warning, data }));
      },
      error => {
        console.log(error);
      }
    );
  };
}