import { memo } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rowView: {
    display: 'flex',
    alignItems: 'center',
  },
  statusItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 80,
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1, 2),
    },
  },
  statusTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  statusValue: {
    fontSize: 18,
    color: theme.custom.palette.lightGrey,
  },
  statusPercent: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.custom.palette.darkGrey,
    marginLeft: theme.spacing(1),
  },
}));

const MagicAlertStatus = ({ title, value = 0, percent }) => {
  const classes = useStyles();

  return (
    <div className={classes.statusItem}>
      <Typography variant="body1" className={classes.statusTitle}>
        {title}
      </Typography>
      <div className={classes.rowView}>
        <Typography className={classes.statusValue}>
          {value.toLocaleString()}
        </Typography>
        {percent !== undefined && (
          <Typography className={classes.statusPercent}>
            {`${percent}%`}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default memo(MagicAlertStatus);
