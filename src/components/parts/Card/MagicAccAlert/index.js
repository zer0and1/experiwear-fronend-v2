import MagicAlertInfo from 'components/parts/Card/MagicAlertInfo';
import { memo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { ContainedButton } from 'components';
import { ALERT_IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),
    borderBottom: `1px solid ${theme.custom.palette.lightGrey}`,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  imageView: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  rowView: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 300,
  },
  type: {
    fontSize: 14,
    textTransform: 'capitalize',
    margin: theme.spacing(1.5),
  },
  button: {
    fontSize: 14,
    height: 35,
    margin: theme.spacing(1.5),
  },
  image: {
    minWidth: 42,
    width: 42,
    height: 42,
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
    marginRight: 20,
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.21)',
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
    borderLeft: `1px solid ${theme.custom.palette.lightGrey}`,
    [theme.breakpoints.down('md')]: {
      borderLeft: 'unset',
    },
  },
}));

const MagicAccAlert = ({ item, onSelect }) => {
  const classes = useStyles();

  const selectNotification = useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  return (
    <div className={classes.item}>
      <div className={classes.leftContainer}>
        <div className={classes.imageView}>
          <img
            alt="news image"
            src={item.imageUrl || ALERT_IMAGE_PLACEHOLDER_IMAGE_PATH}
            className={classes.image}
          />
          <MagicAlertInfo item={item} />
        </div>
        <div className={classes.rowView}>
          <Typography color="textPrimary" className={classes.type}>
            {item.type}
          </Typography>
          {onSelect && (
            <>
              <ContainedButton
                size="small"
                color="purple"
                className={classes.button}
                onClick={selectNotification}
              >
                Show Chart
              </ContainedButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(MagicAccAlert);
