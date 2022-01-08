import * as authAPI from 'services/api-auth';
import * as ActionTypes from 'redux/actionTypes';
import { setLoadingStatus, setResponseError } from '.';

export const setUserAuthStatus = (isAuthenticated, userInfo = {}) => {
  localStorage.setItem('isAuthenticated', isAuthenticated);
  localStorage.setItem('currentUser', JSON.stringify(userInfo));

  return {
    type: ActionTypes.SET_USER_AUTH_STATUS,
    payload: { isAuthenticated, userInfo },
  };
};

export const signIn = (params) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const user = await authAPI.login(params);
    dispatch(setUserAuthStatus(true, user));
  } catch (err) {
    dispatch(setResponseError(err));
  }

  dispatch(setLoadingStatus(false));
};

export const getUserInfo = () => async (dispatch) => {
  try {
    const user = await authAPI.isAuthenticated();
    dispatch(setUserAuthStatus(true, user));
  } catch (err) {
    dispatch(setResponseError(err));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await authAPI.logout();
    localStorage.clear();
    dispatch(setUserAuthStatus(false));
  } catch (err) {
    dispatch(setResponseError(err));
  }
};
