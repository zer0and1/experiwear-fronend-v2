import * as TYPES from './types';

export const setPathTokens = (tokens) => ({
  type: TYPES.SET_PATH_TOKENS,
  payload: tokens,
});

export const setLoadingStatus = (loadingStatus) => ({
  type: TYPES.SET_LOADING_STATUS,
  payload: loadingStatus,
});
