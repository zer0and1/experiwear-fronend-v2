
import Router from 'next/router'

import * as authAPI from 'services/api-auth'
import * as TYPES from './types'
import LINKS from 'utils/constants/links'

const setUserToken = ({ accessToken, user }) => dispatch => {
  dispatch(setAccessToken(accessToken));
  dispatch(setCurrentUser(user));
  Router.push(LINKS.HOME.HREF);
};

const setAccessToken = accessToken => {
  localStorage.setItem('accessToken', accessToken);
  return {
    type: TYPES.SET_ACCESS_TOKEN,
    payload: accessToken
  };
};

const setCurrentUser = currentUser => {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  return {
    type: TYPES.SET_CURRENT_USER,
    payload: currentUser
  };
};

const logoutUser = () => async dispatch => {
  try {
    await authAPI.logout();
  } catch (error) {
    console.log(error)
  }
  localStorage.clear();
  dispatch(setAccessToken(''));
  dispatch(setCurrentUser({}));
  Router.push(LINKS.SIGN_IN.HREF);
};

export {
  setUserToken,
  setAccessToken,
  setCurrentUser,
  logoutUser
}