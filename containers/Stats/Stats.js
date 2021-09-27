import { memo, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setPathTokens } from 'actions/auxiliary';
import LINKS from 'utils/constants/links';
import { CurrentGame } from './components';

const Stats = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPathTokens([{ path: LINKS.STATS.HREF, label: LINKS.STATS.TITLE }]));
  }, [dispatch])

  return (
    <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
        <CurrentGame />
      </Grid>
    </Grid>
  )
}

export default memo(Stats)