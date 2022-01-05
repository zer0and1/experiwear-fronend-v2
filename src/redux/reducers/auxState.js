import { handleActions } from 'redux-actions';
import * as ActionTypes from 'utils/constants/actionTypes';
import * as auxStateUpdaters from './auxStateUpdaters';

const actionHandler = {
  [ActionTypes.SET_PATH_TOKENS]: auxStateUpdaters.setPathTokensUpdater,
  [ActionTypes.SET_LOADING_STATUS]: auxStateUpdaters.setLoadingStatusUpdater,
};

export default handleActions(actionHandler, auxStateUpdaters.INITIAL_AUX_STATE);
