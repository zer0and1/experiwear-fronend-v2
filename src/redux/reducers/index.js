import { combineReducers } from 'redux';

import authReducer from './authReducer';
import alertsReducer from './alertsReducer';
import fanbandsReducer from './fanbandsReducer';
import gamesReducer from './gamesReducer';
import auxReducer from './auxReducer';

export default combineReducers({
  auth: authReducer,
  notifications: alertsReducer,
  fanbands: fanbandsReducer,
  games: gamesReducer,
  aux: auxReducer,
});
