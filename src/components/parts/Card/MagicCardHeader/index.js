import { memo } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    display: 'flex',
    marginBottom: theme.spacing(4),
  },
  mainHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: theme.spacing(6),
  },
  subHeader: {
    fontSize: 18,
  },
}));

const MagicCardHeader = ({ title, subTitle }) => {
  const classes = useStyles();

  return (
    <div className={classes.cardHeader}>
      <Typography color="textPrimary" className={classes.mainHeader}>
        {title}
      </Typography>
      {subTitle && (
        <Typography color="textSecondary" className={classes.subHeader}>
          {subTitle}
        </Typography>
      )}
    </div>
  );
};

export default memo(MagicCardHeader);
