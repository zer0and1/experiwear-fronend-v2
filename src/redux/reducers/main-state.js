import { handleActions } from 'redux-actions';
import * as ActionTypes from 'redux/action-types';
import * as mainStateUpdaters from './main-state-updaters';

const actionHandler = {
  [ActionTypes.SET_TICKETS]: mainStateUpdaters.setTicketsUpdater,
};

export default handleActions(
  actionHandler,
  mainStateUpdaters.INITIAL_MAIN_STATE
);
