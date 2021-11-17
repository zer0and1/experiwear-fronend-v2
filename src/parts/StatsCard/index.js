import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import MagicCardHeader from 'parts/Card/MagicCardHeader';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  black: {
    color: theme.custom.palette.black,
  },
  green: {
    color: theme.custom.palette.green,
  },
  red: {
    color: theme.custom.palette.red,
  },
}));

const StatsCard = () => {
  const classes = useStyles();

  const { statistics = {} } = useSelector((state) => state.fanbands);

  return (
    <Card>
      <CardContent>
        <MagicCardHeader title="Current Fanband Stats" />
        <div className={classes.item}>
          <Typography color="textSecondary">
            Total Provisioned Fanbands
          </Typography>
          <Typography className={clsx(classes.value, classes.black)}>
            {statistics?.total?.toLocaleString()}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography color="textSecondary">
            Total Fanbands <span className={classes.green}>Online</span> Now
          </Typography>
          <Typography className={clsx(classes.value, classes.green)}>
            {statistics?.online?.toLocaleString()}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography color="textSecondary">
            Total Fanbands <span className={classes.red}>Offline</span> Now
          </Typography>
          <Typography className={clsx(classes.value, classes.red)}>
            {statistics?.offline?.toLocaleString()}
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography color="textSecondary">
            Total Fanbands{' '}
            <span className={classes.green}>Online In Arena</span>
          </Typography>
          <Typography className={clsx(classes.value, classes.green)}>
            {statistics?.inArea?.toLocaleString()}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(StatsCard);
