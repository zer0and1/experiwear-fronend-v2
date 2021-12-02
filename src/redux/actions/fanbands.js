import * as TYPES from 'redux/action-types';
import { readFanbands } from 'services/api-fanbands';
import { setError } from '.';

export const setFanbands = (fanbands) => ({
  type: TYPES.SET_FANBANDS,
  payload: fanbands,
});

export const getFanbands = () => async (dispatch) => {
  try {
    const fanbands = await readFanbands();
    dispatch(setFanbands(fanbands));
  } catch (e) {
    dispatch(setError(e));
  }
};
