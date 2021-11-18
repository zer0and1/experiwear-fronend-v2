import { memo } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getEnglishDateWithTime } from 'utils/helpers/time';

const useStyles = makeStyles((theme) => ({
  rowView: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: theme.custom.palette.lightGrey,
    marginLeft: theme.spacing(4),
  },
}));

const MagicAlertInfoHeader = ({ title, date }) => {
  const classes = useStyles();

  return (
    <div className={classes.rowView}>
      <Typography color="textPrimary" className={classes.title}>
        {title}
      </Typography>
      <Typography color="textPrimary" className={classes.date}>
        {getEnglishDateWithTime(date)}
      </Typography>
    </div>
  );
};

export default memo(MagicAlertInfoHeader);
