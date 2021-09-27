import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getEnglishDate, getEnglishTime } from 'utils/helpers/time'
import { getNotifications } from 'actions/getNotifications'
import { Title } from 'components'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100% - 132px)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 4,
    },
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(3)
  },
  icon: {
    marginRight: theme.spacing(1.5),
    objectFit: 'cover',
    width: 46,
    height: 46,
    borderRadius: 6,
  },
  title: {
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 12,
    color: '#333',
  },
}));

const ActivityTimeline = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { all: { results } } = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Title mb={4}>Activity Timeline</Title>
      <div className={classes.container}>
        {results.map((item, index) => (
          <div key={index} className={classes.itemContainer}>
            <img className={classes.icon} src={item.imageUrl} />
            <div>
              <Typography className={classes.title}>
                {`${item.type} alert`}
              </Typography>
              <Typography className={classes.description}>
                {item.title}
              </Typography>
              <Typography className={classes.description}>
                {`${getEnglishDate(item.createdAt)} @ ${getEnglishTime(item.createdAt)}`}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ActivityTimeline);
