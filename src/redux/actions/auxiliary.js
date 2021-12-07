import * as ActionTypes from '../action-types';
import { showSuccessToast, showErrorToast } from 'utils/helpers';

export const setPathTokens = (tokens) => ({
  type: ActionTypes.SET_PATH_TOKENS,
  payload: tokens,
});

export const setLoadingStatus = (loadingStatus) => ({
  type: ActionTypes.SET_LOADING_STATUS,
  payload: loadingStatus,
});

export const setReponseSuccess = ({ message }) => {
  showSuccessToast(message || 'Successfully Executed!');
};

export const setReponseError = (error) => {
  showErrorToast(
    error?.message ||
      error?.response?.data?.message?.[0] ||
      'Something went wrong!'
  );
};
