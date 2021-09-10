
import { combineReducers } from 'redux'

import loadingReducer from 'reducers/loadingReducer'
import authReducer from 'reducers/authReducer'
import notificationsReducer from 'reducers/notificationsReducer'
import fanbandsReducer from 'reducers/fanbandsReducer'
import gamesReducer from 'reducers/gamesReducer'
import accelerometerReducer from 'reducers/accelerometerReducer'
import sideDrawerReducer from 'reducers/sideDrawerReducer'
import auxReducer from './auxReducer'

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
