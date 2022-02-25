import * as authAPI from 'services/api-auth';
import * as ActionTypes from 'redux/actionTypes';
import { setLoadingStatus, setResponseError } from '.';
import { isLocalhost } from 'utils/helpers';
import { COOKIE_MAX_AGE, COOKIE_NAME } from '../../config';

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

    if (isLocalhost()) {
      const date = new Date();
      date.setTime(date.getTime() + COOKIE_MAX_AGE);
      document.cookie = `${COOKIE_NAME}=valid_cookie; expires=${date.toUTCString()}; path=/`;
    }

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
