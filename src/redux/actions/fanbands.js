import * as TYPES from 'redux/action-types';
import { readFanbands } from 'services/api-fanbands';
import { FANBAND_TYPES } from 'utils/constants';
import { setError } from '.';

export const setFanbands = (fanbands) => ({
  type: TYPES.SET_FANBANDS,
  payload: fanbands,
});

export const getFanbands =
  (pageType = FANBAND_TYPES.all) =>
  async (dispatch) => {
    try {
      const fanbands = await readFanbands({ pageType });
      dispatch(setFanbands(fanbands));
    } catch (e) {
      dispatch(setError(e));
    }
  };
