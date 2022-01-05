export const INITIAL_AUX_STATE = {
  pathTokens: [],
  loadingStatus: false,
  error: null,
};

export const setPathTokensUpdater = (state, { payload }) => ({
  ...state,
  pathTokens: [{ path: '/', title: 'Experiwear' }, ...payload],
});

export const setLoadingStatusUpdater = (state, { payload }) => ({
  ...state,
  loadingStatus: payload,
});
