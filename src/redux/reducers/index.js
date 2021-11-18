import { combineReducers } from 'redux';

import loadingReducer from 'redux/reducers/loadingReducer';
import authReducer from 'redux/reducers/authReducer';
import notificationsReducer from 'redux/reducers/notificationsReducer';
import fanbandsReducer from 'redux/reducers/fanbandsReducer';
import gamesReducer from 'redux/reducers/gamesReducer';
import accelerometerReducer from 'redux/reducers/accelerometerReducer';
import sideDrawerReducer from 'redux/reducers/sideDrawerReducer';
import auxReducer from './auxReducer';

export default combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  notifications: notificationsReducer,
  fanbands: fanbandsReducer,
  games: gamesReducer,
  accelerometer: accelerometerReducer,
  sidebar: sideDrawerReducer,
  aux: auxReducer,
});
