import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import OfflineIcon from 'components/Icons/OfflineIcon'

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

const OfflineBand = () => {
  const classes = useStyles();
  const { statistics: { offline = 0 } } = useSelector(state => state.fanbands);

  return (
    <Card className={classes.card}>
      <CardContent>
        <OfflineIcon />
        <Typography
          color='textSecondary'
          className={classes.title}
        >
          {offline}
        </Typography>
        <Typography
          color='textSecondary'
          className={classes.description}
        >
          Offline Fanbands
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(OfflineBand);
