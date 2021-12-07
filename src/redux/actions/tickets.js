import * as ActionTypes from 'redux/action-types';
import { createAction } from 'redux-actions';
import { setResponseError, setLoadingStatus } from '.';
import {
  createTicket,
  deleteTicket,
  readTickets,
  updateTicket,
} from 'services/api-tickets';
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
    dispatch(setResponseError(e));
  }
};

export const insertTicket = (params) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const { message } = await createTicket(params);
    showSuccessToast(message);
    dispatch(getTickets());
  } catch (e) {
    dispatch(setResponseError(e));
  }

  dispatch(setLoadingStatus(false));
};

export const modifyTicket = (id, params) => async (dispatch, getState) => {
  dispatch(setLoadingStatus(true));
  const tickets = getState().main.tickets.results;

  try {
    const { message, data } = await updateTicket(id, params);
    showSuccessToast(message);
    dispatch(setTickets(tickets.map((t) => (t.id === id ? data : t))));
  } catch (e) {
    dispatch(setResponseError(e));
  }

  dispatch(setLoadingStatus(false));
};

export const removeTicket = (id) => async (dispatch, getState) => {
  dispatch(setLoadingStatus(true));
  const tickets = getState().main.tickets.results;

  try {
    const { message } = await deleteTicket(id);
    showSuccessToast(message);
    dispatch(setTickets(tickets.filter((t) => t.id !== id)));
  } catch (e) {
    dispatch(setResponseError(e));
  }

  dispatch(setLoadingStatus(false));
};
