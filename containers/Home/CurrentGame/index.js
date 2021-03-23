import { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import HomeCardWrapper from '../Shared/HomeCardWrapper'
import {
  TEMP_TEAM_CELITICS_IMAGE_PATH,
  TEMP_TEAM_HAWKS_IMAGE_PATH
} from 'utils/constants/image-paths'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginTop: theme.spacing(2)
  },
  team: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 128,
    height: 128,
    objectFit: 'contain'
  },
  score: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: theme.spacing(2)
  },
  vs: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quarter: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: theme.spacing(1)
  },
  time: {
    fontSize: 18
  }
}));

const CurrentGame = () => {
  const classes = useStyles();

  return (
    <HomeCardWrapper
      title='Current Game'
      subTitle='February 24, 2021'
    >
      <div className={classes.container}>
        <div className={classes.team}>
          <img
            alt='home-image'
            src={TEMP_TEAM_CELITICS_IMAGE_PATH}
            className={classes.image}
          />
          <Typography
            color='textPrimary'
            className={classes.score}
          >
            46
          </Typography>
        </div>
        <Typography
          color='textPrimary'
          className={classes.vs}
        >
          VS
        </Typography>
        <div className={classes.team}>
          <img
            alt='away-image'
            src={TEMP_TEAM_HAWKS_IMAGE_PATH}
            className={classes.image}
          />
          <Typography
            color='textPrimary'
            className={classes.score}
          >
            44
          </Typography>
        </div>
      </div>
      <Typography
        color='textPrimary'
        className={classes.quarter}
      >
        2nd Quarter
      </Typography>
      <Typography
        color='textPrimary'
        className={classes.time}
      >
        4:23 remaining
      </Typography>
    </HomeCardWrapper>
  );
};

export default memo(CurrentGame);
