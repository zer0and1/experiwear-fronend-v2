import { memo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  getScheduledNotifications,
  getMoreScheduledNotifications,
} from 'actions/getScheduledNotifications';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import MagicCardHeader from 'parts/Card/MagicCardHeader';
import MagicScheduleAlert from 'parts/Card/MagicScheduleAlert';

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 420,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
  },
}));

const ScheduleList = ({ setSelectedItem }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    scheduled: { results, total },
  } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getScheduledNotifications());
  }, [dispatch]);

  const editHandler = useCallback(
    (item) => {
      setSelectedItem(item);
    },
    [setSelectedItem]
  );

  const moreHandler = () => {
    dispatch(getMoreScheduledNotifications());
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <MagicCardHeader title="Active Scheduled Alerts" />
        {results.map((item, index) => (
          <MagicScheduleAlert key={index} item={item} onEdit={editHandler} />
        ))}
        {results.length < total && (
          <div className={classes.button}>
            <ContainedButton color="green" onClick={moreHandler}>
              More
            </ContainedButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(ScheduleList);
