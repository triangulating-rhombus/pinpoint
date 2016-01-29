import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import SocketReducer from './reducer_socket';

const rootReducer = combineReducers({
  user: UserReducer,
  socket: SocketReducer
});

export default rootReducer;
