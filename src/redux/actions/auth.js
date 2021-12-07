import Router from 'next/router';

import * as authAPI from 'services/api-auth';
import * as TYPES from '../action-types';
import { LINKS } from 'utils/constants';

const setUserToken =
  ({ isAuthenticated, user }) =>
  (dispatch) => {
    dispatch(setIsAuthenticated(isAuthenticated));
    dispatch(setCurrentUser(user));
    Router.push(LINKS.home.path);
  };

const setIsAuthenticated = (isAuthenticated) => {
  localStorage.setItem('isAuthenticated', isAuthenticated);
  return {
    type: TYPES.SET_IS_AUTHENTICATED,
    payload: isAuthenticated,
  };
};

const setCurrentUser = (currentUser) => {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  return {
    type: TYPES.SET_CURRENT_USER,
    payload: currentUser,
  };
};

const logoutUser = () => async (dispatch) => {
  try {
    await authAPI.logout();
  } catch (error) {
    console.log(error);
  }
  localStorage.clear();
  dispatch(setIsAuthenticated(false));
  dispatch(setCurrentUser({}));
  Router.push(LINKS.signIn.path);
};

export { setUserToken, setIsAuthenticated, setCurrentUser, logoutUser };
