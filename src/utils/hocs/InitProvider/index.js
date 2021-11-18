import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import * as authAPI from 'services/api-auth';
import { setIsAuthenticated, setCurrentUser } from 'redux/actions/auth';
import { getGames } from 'redux/actions/games';
import { getFanbandsStatistics } from 'redux/actions/getFanbandsStatistics';
import useGameSocket from 'hooks/useGameSocket';
import useFanbandSocket from 'hooks/useFanbandSocket';
import { isServer } from 'utils/helpers/utility';
import { AUTH_ROUTES, PAGE_ROUTES } from 'utils/constants/routes';
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
      router.push(LINKS.SIGN_IN.HREF);
    }
  };

  useEffect(() => {
    const isAuthenticated = isServer() ? '' : localStorage.isAuthenticated;
    if (isAuthenticated === 'true') {
      if (AUTH_ROUTES.includes(router.pathname)) {
        router.push(LINKS.HOME.HREF);
      }
    } else {
      if (PAGE_ROUTES.includes(router.pathname)) {
        router.push(LINKS.SIGN_IN.HREF);
      }
    }

    window.scroll({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <div />;
};

export default memo(InitProvider);
