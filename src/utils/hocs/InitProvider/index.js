import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import * as authAPI from 'services/api-auth';
import { setIsAuthenticated, setCurrentUser } from 'redux/actions/auth';
import { getGames } from 'redux/actions/games';
import { getFanbandsStatistics } from 'redux/actions/getFanbandsStatistics';
import { useFanbandSocket, useGameSocket } from 'hooks/useFanbandSocket';
import { isServer } from 'utils/helpers';
import LINKS from 'utils/constants/links';

const InitProvider = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useGameSocket();
  useFanbandSocket();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const isAuthenticated = isServer() ? '' : localStorage.isAuthenticated;
    const currentUser = isServer() ? null : localStorage.currentUser;

    dispatch(setIsAuthenticated(isAuthenticated === 'true'));
    if (!!currentUser) {
      dispatch(setCurrentUser(JSON.parse(currentUser)));
    }

    checkAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getGames());
      dispatch(getFanbandsStatistics());
    }
  }, [isAuthenticated, dispatch]);

  const checkAuthenticate = async () => {
    try {
      const user = await authAPI.isAuthenticated();
      dispatch(setCurrentUser(user));
      dispatch(setIsAuthenticated(true));
    } catch (error) {
      console.log(error);
      dispatch(setCurrentUser({}));
      dispatch(setIsAuthenticated(false));
      router.push(LINKS.signIn.path);
    }
  };

  useEffect(() => {
    const isAuthenticated = isServer()
      ? false
      : JSON.parse(localStorage.isAuthenticated);
    if (isAuthenticated) {
      router.push(LINKS.home.path);
    } else {
      router.push(LINKS.signIn.path);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <div />;
};

export default memo(InitProvider);
