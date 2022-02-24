import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getNotifications } from 'redux/actions';
import { AlertItem, Title } from 'components';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 0,
    flexGrow: 1,
    overflowY: 'scroll',
    '&::scrollbar': {
      width: '0.6em',
    },
    '&::scrollbar-track': {
      'box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: theme.spacing(0.5),
    },
  },
}));

const ActivityTimeline = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    all: { results },
  } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Title mb={4}>Activity Timeline</Title>
      <div className={classes.container}>
        {results.map((item) => (
          <AlertItem key={item.id} data={item} mb={2} />
        ))}
      </div>
    </div>
  );
};

export default memo(ActivityTimeline);
