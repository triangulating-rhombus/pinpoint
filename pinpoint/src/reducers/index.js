import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import SocketReducer from './reducer_socket';
import SettingsReducer from './reducer_settings';
import PoiReducer from './reducer_poi';
import MarkersReducer from './reducer_markers';
import toggleHotspot from './reducer_toggle_hotspots';
import hotSpotPins from './reducer_hotspot_data';
import StatsVisibilityReducer from './reducer_stats_visibility';
import TagReducer from './reducer_tag';

const rootReducer = combineReducers({
  user: UserReducer,
  socket: SocketReducer,
  settings: SettingsReducer,
  poi: PoiReducer,
  markers: MarkersReducer,
  hotSpotVisibility: toggleHotspot,
  hotSpotPins: hotSpotPins,
  statsVisibility: StatsVisibilityReducer,
  tag: TagReducer
});

export default rootReducer;
