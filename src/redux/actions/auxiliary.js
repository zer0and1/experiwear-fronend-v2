import * as ActionTypes from 'utils/constants/actionTypes';
import { showSuccessToast, showErrorToast } from 'utils/helpers';

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

export const setResponseError = (error) => {
  showErrorToast(
    error?.response?.data?.message ||
      error?.response?.data?.message?.[0] ||
      error?.message ||
      'Something went wrong!'
  );

  return {
    type: ActionTypes.SET_RESPONSE_ERROR,
    payload: error,
  };
};
