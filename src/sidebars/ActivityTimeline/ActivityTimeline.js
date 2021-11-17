import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getNotifications } from 'actions/getNotifications';
import { AlertItem, Title } from 'components';

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
