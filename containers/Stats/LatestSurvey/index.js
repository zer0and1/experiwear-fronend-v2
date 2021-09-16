import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Doughnut } from 'react-chartjs-2'

import { getLatestNotification } from 'actions/getLatestNotification'
import HomeCardWrapper from '../Shared/HomeCardWrapper'
import ChartFooterItem from '../Shared/ChartFooterItem'
import { ALERT_TYPES } from 'utils/constants/alert-types'
import getPercent from 'utils/helpers/getPercent'
import { getEnglishDateWithTime } from 'utils/helpers/time'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing(4)
  },
  chart: {
    position: 'relative',
    height: 'fit-content'
  },
  chartLabel: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  total: {
    fontWeight: 'bold'
  },
  footer: {
    width: '100%',
    marginTop: theme.spacing(4)
  }
}))

const LatestSurvey = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLatestNotification(ALERT_TYPES.SURVEY.VALUE))
  }, [dispatch])

  const { latestSurvey } = useSelector(state => state.notifications)

  const totalAnswer = (latestSurvey?.yes || 0) + (latestSurvey?.no || 0)
  const noResponse = (latestSurvey?.sent || 0) - totalAnswer
  const yesPercent = getPercent(latestSurvey?.yes || 0, latestSurvey?.sent || 0)
  const noPercent = getPercent(latestSurvey?.no || 0, latestSurvey?.sent || 0)
  const noResponsePercent = getPercent(noResponse, latestSurvey?.sent || 0)

  return (
    <HomeCardWrapper
      title='Latest Survey'
      subTitle={getEnglishDateWithTime(latestSurvey?.createdAt)}
    >
      <Typography
        color='textPrimary'
        className={classes.title}
      >
        {latestSurvey?.title}
      </Typography>
      <div className={classes.chart}>
        <div className={classes.chartLabel}>
          <Typography variant='body2' color='textPrimary' className={classes.total}>
            Total
          </Typography>
          <Typography variant='body2' color='textPrimary'>
            {latestSurvey?.sent || 0}
          </Typography>
        </div>
        <Doughnut
          data={{
            labels: [`Yes - ${yesPercent}%`, `No - ${noPercent}%`, `No Response - ${noResponsePercent}%`],
            datasets: [{
              data: [
                latestSurvey?.yes || 0,
                latestSurvey?.no || 0,
                noResponse
              ],
              backgroundColor: ['#7961f9', '#ff9f43', '#ea5455'],
              borderColor: ['#7961f9', '#ff9f43', '#ea5455'],
            }],
          }}
          options={{
            scales: false,
            cutoutPercentage: 70,
            legend: false,
            tooltips: false,
          }}
          width={230}
          height={230}
        />
      </div>
      <div className={classes.footer}>
        <ChartFooterItem
          type='yes'
          percent={yesPercent}
          ratePercent={0.06}
        />
        <ChartFooterItem
          type='no'
          percent={noPercent}
          ratePercent={0.06}
        />
        <ChartFooterItem
          type='noResponse'
          percent={noResponsePercent}
          ratePercent={-0.06}
        />
      </div>
    </HomeCardWrapper>
  )
}

export default memo(LatestSurvey)
