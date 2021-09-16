import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import OnlineIcon from 'components/Icons/OnlineIcon'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: theme.spacing(2)
  },
  description: {
    fontSize: 14,
    marginBottom: theme.spacing(1)
  },
}));

const OnlineBand = () => {
  const classes = useStyles();
  const { statistics: { online = 0 } } = useSelector(state => state.fanbands);

  return (
    <Card className={classes.card}>
      <CardContent>
        <OnlineIcon />
        <Typography
          color='textSecondary'
          className={classes.title}
        >
          {online}
        </Typography>
        <Typography
          color='textSecondary'
          className={classes.description}
        >
          Online Fanbands
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(OnlineBand);
