
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Divider
} from '@material-ui/core'

import {
  TEMP_TEAM_CELITICS_IMAGE_PATH,
  TEMP_TEAM_HAWKS_SMALL_IMAGE_PATH
} from 'utils/constants/image-paths'

const useStyles = makeStyles((theme) => ({
  gameList: {
    padding: theme.spacing(0, 1),
    margin: theme.spacing(0.5, 0),
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.background.primary
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 0)
  },
  date: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  divider: {
    height: 1,
    margin: theme.spacing(0, 9)
  },
  teamList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1.5, 0)
  },
  teamItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  teamName: {
    display: 'flex',
    alignItems: 'center',
  },
  teamImage: {
    width: 20,
    height: 20,
    objectFit: 'container',
    marginRight: theme.spacing(1)
  },
  teamText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  signal: {
    fontSize: 12,
    fontWeight: 'bold'
  }
}));

const GameMatchInfo = () => {
  const classes = useStyles();

  return (
    <div className={classes.gameList}>
      <div className={classes.header}>
        <Typography
          color='textPrimary'
          className={classes.date}
        >
          Today, 7:30pm
        </Typography>
        <div>
          <Typography
            align='right'
            color='textPrimary'
            className={classes.date}
          >
            2nd Qtr,
          <br />
            4:23 remaining
          </Typography>
        </div>
      </div>
      <Divider
        flexItem
        orientation='horizontal'
        className={classes.divider}
      />
      <div className={classes.teamList}>
        <div className={classes.teamItem}>
          <div className={classes.teamName}>
            <img
              src={TEMP_TEAM_CELITICS_IMAGE_PATH}
              className={classes.teamImage}
            />
            <Typography className={classes.teamText}>
              Celtics
            </Typography>
          </div>
          <Typography className={classes.teamText}>
            44
          </Typography>
        </div>
        <Typography className={classes.signal}>
          @
        </Typography>
        <div className={classes.teamItem}>
          <div className={classes.teamName}>
            <img
              src={TEMP_TEAM_HAWKS_SMALL_IMAGE_PATH}
              className={classes.teamImage}
            />
            <Typography className={classes.teamText}>
              Hawks
          </Typography>
          </div>
          <Typography className={classes.teamText}>
            46
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default memo(GameMatchInfo)