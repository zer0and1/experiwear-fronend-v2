import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, setSelectedDate } from 'actions/getNotifications';
import { Button, Card, CardContent, makeStyles } from '@material-ui/core';
import { Calendar } from 'components';
import { Add } from '@material-ui/icons';
import LINKS from 'utils/constants/links';
import { useRouter } from 'next/router';
import { setPathTokens } from 'actions/auxiliary';
import { setSelectedGame } from 'actions/games';

const useStyles = makeStyles((theme) => ({
  newsAlertButton: {
    backgroundColor: theme.palette.info.main,
    fontSize: 12,
    height: 35,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  cardContent: {
    height: '100%',
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const { selectedDate, alertStatus } = useSelector(
    (state) => state.notifications
  );

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(date));
  };

  const handleCreateNewsAlert = () => {
    router.push(LINKS.NEWS.HREF);
  };

  useEffect(() => {
    dispatch(getNotifications());
    dispatch(
      setPathTokens([{ path: LINKS.HOME.HREF, label: LINKS.HOME.TITLE }])
    );
    dispatch(setSelectedGame(''));
  }, [dispatch]);

  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <Calendar
          value={selectedDate}
          cellData={alertStatus}
          actions={
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              className={classes.newsAlertButton}
              onClick={handleCreateNewsAlert}
            >
              News Alert
            </Button>
          }
          onChange={handleDateChange}
        />
      </CardContent>
    </Card>
  );
};

export default memo(Home);
