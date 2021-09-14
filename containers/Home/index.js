
import { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'

import { getNotifications } from 'actions/getNotifications'
// import AlertCarousel from './AlertCarousel'
// import OnlineBand from './OnlineBand'
// import OfflineBand from './OfflineBand'
// import CurrentGame from './CurrentGame'
// import CreateBandAlert from './CreateBandAlert'
// import ActivityTimeline from './ActivityTimeline'
// import LatestSurvey from './LatestSurvey'
// import OnlineFanband from './OnlineFanband'
// import LatestAlert from './LatestAlert'
import { Calendar } from 'components'

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Calendar />
      </Grid>
      {/* <Grid item xs={12} lg={6}>
        <AlertCarousel />
      </Grid>
      <Grid item xs={12} lg={3}>
        <OnlineBand />
      </Grid>
      <Grid item xs={12} lg={3}>
        <OfflineBand />
      </Grid>
      <Grid item xs={12} lg={4}>
        <CurrentGame />
      </Grid>
      <Grid item xs={12} lg={4}>
        <OnlineFanband />
      </Grid>
      <Grid item xs={12} lg={4}>
        <CreateBandAlert />
      </Grid>
      <Grid item xs={12} lg={4}>
        <LatestAlert />
      </Grid>
      <Grid item xs={12} lg={4}>
        <LatestSurvey />
      </Grid>
      <Grid item xs={12} lg={4}>
        <ActivityTimeline />
      </Grid> */}
    </Grid>
  )
}

export default memo(Home)