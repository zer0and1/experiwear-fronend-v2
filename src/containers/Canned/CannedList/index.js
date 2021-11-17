import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  getCannedNotifications,
  getMoreCannedNotifications,
} from 'actions/getCannedNotifications';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import MagicCardHeader from 'parts/Card/MagicCardHeader';
import MagicCannedAlert from 'parts/Card/MagicCannedAlert';

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

const CannedList = ({ setSelectedItem, setFocus }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    canned: { results, total },
  } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getCannedNotifications());
  }, [dispatch]);

  const editHandler = useCallback(
    (item) => {
      setSelectedItem(item);
      setFocus();
    },
    [setSelectedItem, setFocus]
  );

  const moreHandler = () => {
    dispatch(getMoreCannedNotifications());
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <MagicCardHeader title="Active Saved Alerts" />
        {results.map((item, index) => (
          <MagicCannedAlert key={index} item={item} onEdit={editHandler} />
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

export default memo(CannedList);
