import { handleActions } from 'redux-actions';
import * as ActionTypes from 'redux/action-types';
import * as auxStateUpdaters from './aux-state-updaters';

const actionHandler = {
  [ActionTypes.SET_PATH_TOKENS]: auxStateUpdaters.setPathTokensUpdater,
  [ActionTypes.SET_LOADING_STATUS]: auxStateUpdaters.setLoadingStatusUpdater,
};

export default handleActions(actionHandler, auxStateUpdaters.INITIAL_AUX_STATE);
