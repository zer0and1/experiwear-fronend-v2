import * as ActionTypes from 'redux/actionTypes';
import { showSuccessToast, showErrorToast } from 'utils/helpers';
import { setUserAuthStatus } from '.';

export const setPathTokens = (tokens) => ({
  type: ActionTypes.SET_PATH_TOKENS,
  payload: tokens,
});

export const setLoadingStatus = (loadingStatus) => ({
  type: ActionTypes.SET_LOADING_STATUS,
  payload: loadingStatus,
});

export const setResponseSuccess = (response) => {
  showSuccessToast(response?.message || 'Successfully Executed!');

  return {
    type: ActionTypes.SET_RESPONSE_SUCCESS,
    payload: response,
  };
};

export const setResponseError = (error) => (dispatch) => {
  const statusCode = error?.response?.status;

  if (statusCode === 401) {
    dispatch(setUserAuthStatus(false));
  }

  dispatch({
    type: ActionTypes.SET_RESPONSE_ERROR,
    payload: error,
  });

  showErrorToast(
    error?.response?.data?.message ||
      error?.response?.data?.message?.[0] ||
      error?.message ||
      'Something went wrong!'
  );
};
