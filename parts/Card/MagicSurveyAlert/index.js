import { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import MagicSurveyInfo from 'parts/Card/MagicSurveyInfo'
import MagicAlertStatus from 'parts/Card/MagicAlertStatus'
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),
    borderBottom: `1px solid ${theme.custom.palette.lightGrey}`,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  image: {
    minWidth: 42,
    width: 42,
    height: 42,
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
    marginRight: 20,
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.21)'
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
    borderLeft: `1px solid ${theme.custom.palette.lightGrey}`,
    [theme.breakpoints.down('md')]: {
      borderLeft: 'unset'
    }
  },
}));

const MagicSurveyAlert = ({
  item
}) => {
  const classes = useStyles();
  const { statistics: { total = 0 } } = useSelector(state => state.fanbands);

  return (
    <div className={classes.item}>
      <div className={classes.leftContainer}>
        <img
          alt='news image'
          src={item.image || IMAGE_PLACEHOLDER_IMAGE_PATH}
          className={classes.image}
        />
        <MagicSurveyInfo item={item} />
      </div>

      <div className={classes.rightContainer}>
        <MagicAlertStatus
          title='Sent:'
          value={item.sent}
          percent={total === 0 ? 0 : item.sent / total}
        />
        <MagicAlertStatus
          title='Open:'
          value={item.received}
          percent={item.sent === 0 ? 0 : item.received / item.sent}
        />
      </div>
    </div>
  );
};

export default memo(MagicSurveyAlert);
