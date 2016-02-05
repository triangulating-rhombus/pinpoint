import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import SocketReducer from './reducer_socket';
import SettingsReducer from './reducer_settings';
import allUsers from './reducer_updatePins';
import StatsReducer from './reducer_stats';
import toggleHotspot from './reducer_toggle_hotspots';

const rootReducer = combineReducers({
  user: UserReducer,
  socket: SocketReducer,
  settings: SettingsReducer,
  allUsers: allUsers,
  stats: StatsReducer,
  hotSpotVisibility: toggleHotspot
});

export default rootReducer;
