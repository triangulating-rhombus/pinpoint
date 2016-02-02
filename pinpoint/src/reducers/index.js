import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import SocketReducer from './reducer_socket';
import SettingsReducer from './reducer_settings';

const rootReducer = combineReducers({
  user: UserReducer,
  socket: SocketReducer,
  settings: SettingsReducer
});

export default rootReducer;
