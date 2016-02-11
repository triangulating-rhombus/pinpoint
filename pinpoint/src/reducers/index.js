import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import SocketReducer from './reducer_socket';
import SettingsReducer from './reducer_settings';
import MarkersReducer from './reducer_markers';
import HotspotsReducer from './reducer_hotspots';
import StatsReducer from './reducer_stats';
import TagReducer from './reducer_tag';

const rootReducer = combineReducers({
  user: UserReducer,
  socket: SocketReducer,
  settings: SettingsReducer,
  markers: MarkersReducer,
  hotspots: HotspotsReducer,
  stats: StatsReducer,
  tag: TagReducer
});

export default rootReducer;
