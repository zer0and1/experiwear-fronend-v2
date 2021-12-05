import * as ActionTypes from 'redux/action-types';
import { createAction } from 'redux-actions';
import { setError, setLoadingStatus } from '.';
import { createTicket, readTickets } from 'services/api-tickets';
import { showSuccessToast } from 'utils/helpers';

export const setTickets = createAction(
  ActionTypes.SET_TICKETS,
  (payload) => payload
);

export const getTickets = (params) => async (dispatch) => {
  try {
    const fanbands = await readTickets(params);
    dispatch(setTickets(fanbands));
  } catch (e) {
    dispatch(setError(e));
  }
};

export const insertTicket = (params) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const { message } = await createTicket(params);
    showSuccessToast(message);
    dispatch(getTickets());
  } catch (e) {
    dispatch(setError(e));
  }

  dispatch(setLoadingStatus(false));
};
