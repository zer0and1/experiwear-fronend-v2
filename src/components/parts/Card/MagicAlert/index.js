import { memo } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import MagicAlertInfo from 'components/parts/Card/MagicAlertInfo';
import MagicAlertStatus from 'components/parts/Card/MagicAlertStatus';
import { ALERT_IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';
import getPercent from 'utils/helpers/getPercent';

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
    width: '100%',
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

const MagicAlert = ({ item }) => {
  const classes = useStyles();
  const {
    statistics: { total = 0 },
  } = useSelector((state) => state.fanbands);

  return (
    <div className={classes.item}>
      <div className={classes.leftContainer}>
        <img
          alt="news image"
          src={item?.imageUrl || ALERT_IMAGE_PLACEHOLDER_IMAGE_PATH}
          className={classes.image}
        />
        <MagicAlertInfo item={item} />
      </div>

      <div className={classes.rightContainer}>
        <MagicAlertStatus
          title="Sent:"
          value={item?.sent || 0}
          percent={getPercent(item?.sent, total)}
        />
        <MagicAlertStatus
          title="Open:"
          value={item?.received || 0}
          percent={getPercent(item?.received, item?.sent || 0)}
        />
      </div>
    </div>
  );
};

export default memo(MagicAlert);
