import { handleActions } from 'redux-actions';
import * as ActionTypes from 'redux/action-types';
import * as mainStateUpdaters from './main-state-updaters';

const actionHandler = {
  [ActionTypes.SET_TICKETS]: mainStateUpdaters.setTicketsUpdater,
  [ActionTypes.SET_FANBANDS]: mainStateUpdaters.setFanbandsUpdater,
  [ActionTypes.SET_FANBANDS_STATISTICS]:
    mainStateUpdaters.setFanbandsStatisticsUpdater,
};

export default handleActions(
  actionHandler,
  mainStateUpdaters.INITIAL_MAIN_STATE
);
