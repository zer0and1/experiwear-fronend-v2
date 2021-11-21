import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNotifications,
  setSelectedDate,
} from 'redux/actions/getNotifications';
import { Card, CardContent } from '@material-ui/core';
import { Calendar, CardHeaderButton } from 'components';
import { Add } from '@material-ui/icons';
import LINKS from 'utils/constants/links';
import { useRouter } from 'next/router';
import { setPathTokens } from 'redux/actions/auxiliary';
import { setSelectedGame } from 'redux/actions/games';

const Home = () => {
  const dispatch = useDispatch();
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
      <CardContent>
        <Calendar
          value={selectedDate}
          cellData={alertStatus}
          actions={
            <CardHeaderButton
              startIcon={<Add />}
              onClick={handleCreateNewsAlert}
            >
              News Alert
            </CardHeaderButton>
          }
          onChange={handleDateChange}
        />
      </CardContent>
    </Card>
  );
};

export default memo(Home);
