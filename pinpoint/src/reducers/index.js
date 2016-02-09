import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import SocketReducer from './reducer_socket';
import SettingsReducer from './reducer_settings';
import allUsers from './reducer_updatePins';
import toggleHotspot from './reducer_toggle_hotspots';
import hotSpotPins from './reducer_hotspot_data';
import PoiReducer from './reducer_poi';

// This will help us acheieve filtering on mapView
import FilterBySelectedTagName from './reducer_filter_tag_name';


const rootReducer = combineReducers({
  user: UserReducer,
  socket: SocketReducer,
  settings: SettingsReducer,
  allUsers: allUsers,
  hotSpotVisibility: toggleHotspot,
  poi: PoiReducer,
  hotSpotPins: hotSpotPins,
  // Store now knows what current Tag we are filtering by!
  currentTagLabel: FilterBySelectedTagName,

});

export default rootReducer;
