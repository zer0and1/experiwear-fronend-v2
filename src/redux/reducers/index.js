import { combineReducers } from 'redux';

import authReducer from './authReducer';
import alertsReducer from './alertsReducer';
import gamesReducer from './gamesReducer';
import auxReducer from './aux-state';
import mainReducer from './main-state';

export default combineReducers({
  auth: authReducer,
  notifications: alertsReducer,
  games: gamesReducer,
  aux: auxReducer,
  main: mainReducer,
});
