import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import SocketReducer from './reducer_socket';
import SettingsReducer from './reducer_settings';
import TagReducer from './reducer_tag';
import MarkersReducer from './reducer_markers';
import HotspotsReducer from './reducer_hotspots';
import StatsReducer from './reducer_stats';

export default rootReducer = combineReducers({
  user: UserReducer,
  socket: SocketReducer,
  settings: SettingsReducer,
  tag: TagReducer,
  markers: MarkersReducer,
  hotspots: HotspotsReducer,
  stats: StatsReducer
});