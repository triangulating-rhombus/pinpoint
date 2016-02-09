import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import SocketReducer from './reducer_socket';
import SettingsReducer from './reducer_settings';
import PoiReducer from './reducer_poi';
import MarkersReducer from './reducer_markers';
import toggleHotspot from './reducer_toggle_hotspots';
import hotSpotPins from './reducer_hotspot_data';

const rootReducer = combineReducers({
  user: UserReducer,
  socket: SocketReducer,
  settings: SettingsReducer,
  poi: PoiReducer,
  markers: MarkersReducer,
  hotSpotVisibility: toggleHotspot,
  hotSpotPins: hotSpotPins
});

export default rootReducer;
