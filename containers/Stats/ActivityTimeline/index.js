import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import HomeCardWrapper from '../Shared/HomeCardWrapper'
import getAlertIcon from 'utils/helpers/getAlertIcon'
import { getEnglishDateWithTime } from 'utils/helpers/time'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxHeight: 400,
    overflowY: 'scroll',
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.background.default
    },
    '&::-webkit-scrollbar': {
      width: theme.spacing(0.5),
      backgroundColor: theme.palette.background.default
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 2,
      backgroundColor: theme.custom.palette.grey
    }
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(3)
  },
  icon: {
    marginRight: theme.spacing(1.5)
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.custom.palette.grey
  },
  description: {
    fontSize: 12,
    color: theme.custom.palette.grey
  }
}));

const ActivityTimeline = () => {
  const classes = useStyles();
  const { all: { results } } = useSelector(state => state.notifications)

  return (
    <HomeCardWrapper title='Activity Timeline'>
      <div className={classes.container}>
        {results.map((item, index) => {
          const alertInfo = getAlertIcon(item.type)
          return (
            <div key={index} className={classes.itemContainer}>
              <alertInfo.icon className={classes.icon} />
              <div>
                <Typography className={classes.title}>
                  {alertInfo.title}
                </Typography>
                <Typography className={classes.description}>
                  {item.title}
                </Typography>
                <Typography className={classes.description}>
                  {getEnglishDateWithTime(item.createdAt)}
                </Typography>
              </div>
            </div>
          )
        })}
      </div>
    </HomeCardWrapper>
  );
};

export default memo(ActivityTimeline);
