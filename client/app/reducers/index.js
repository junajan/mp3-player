import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../utils/history';
import playerReducer from './player';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    ...injectedReducers,
    player: playerReducer,
  });

  // Wrap the root reducer and return a new root reducer with router state
  return connectRouter(history)(rootReducer);
}
