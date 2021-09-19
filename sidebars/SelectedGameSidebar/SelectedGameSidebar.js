import { Fragment, useEffect } from 'react';
import { Calendar, Title } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from 'actions/getNotifications';
import { useRouter } from 'next/router';
import LINKS from 'utils/constants/links';

const HomeSidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedDate, alertStatus: cellData } = useSelector(state => state.notifications);
  const { selectedGame } = useSelector(state => state.games);

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(date));
  };

  useEffect(() => {
    selectedGame || router.push(LINKS.HOME.HREF);
  }, [selectedGame]);

  return (
    <Fragment>
      <Title mb={3}>
        Calendar
      </Title>
      <Calendar
        value={selectedDate}
        minimized={true}
        cellData={cellData}
        onChange={handleDateChange}
        mb={8}
      />
      <Title mb={4}>
        Alerts to show
      </Title>
    </Fragment>
  );
};

export default HomeSidebar;