import { memo, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setPathTokens } from 'actions/auxiliary';
import LINKS from 'utils/constants/links';
import { CurrentGame, Fanbands, LatestAlert, LatestSurvey } from './components';

const Stats = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setPathTokens([{ path: LINKS.STATS.HREF, label: LINKS.STATS.TITLE }])
    );
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item lg={6} md={12}>
        <CurrentGame />
      </Grid>
      <Grid item lg={6} md={12}>
        <Fanbands />
      </Grid>
      <Grid item lg={6} md={12}>
        <LatestAlert />
      </Grid>
      <Grid item lg={6} md={12}>
        <LatestSurvey />
      </Grid>
    </Grid>
  );
};

export default memo(Stats);
