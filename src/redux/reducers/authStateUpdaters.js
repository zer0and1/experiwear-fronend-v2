export const INITIAL_AUTH_STATE = {
  isAuthenticated: false,
  currentUser: {},
};

export const setUserAthStatusUpdater = (state, { payload }) => ({
  ...state,
  isAuthenticated: payload.isAuthenticated,
  currentUser: payload.userInfo,
});
