import * as ActionTypes from 'redux/action-types';
import { createAction } from 'redux-actions';
import { setError } from '.';
import { readTickets } from 'services/api-tickets';

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
