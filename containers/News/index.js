
import { memo, useEffect } from 'react'
import { Grid } from '@material-ui/core'

import StatsCard from 'parts/StatsCard'
import CreateNewsAlert from './CreateNewsAlert'
import NewsList from './NewsList'
import { useDispatch } from 'react-redux'
import { setPathTokens } from 'actions/auxiliary'
import LINKS from 'utils/constants/links'

const News = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPathTokens([{ path: LINKS.NEWS.HREF, label: LINKS.NEWS.TITLE }]));
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <CreateNewsAlert />
      </Grid>
      <Grid item xs={12} lg={4}>
        <StatsCard />
      </Grid>
      <Grid item xs={12}>
        <NewsList />
      </Grid>
    </Grid>
  )
}

export default memo(News)