import * as TYPES from './types';

export const setLoadingStatus = (loadingStatus) => (dispatch) => {
  dispatch({
    type: TYPES.SET_LOADING_STATUS,
    payload: loadingStatus,
  });
};
