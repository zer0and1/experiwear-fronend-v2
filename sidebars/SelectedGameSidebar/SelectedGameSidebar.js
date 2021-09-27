import { Fragment, useEffect } from 'react';
import { Calendar, Checkbox, Title } from 'components';
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
  }, [selectedGame, router]);

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
      <Title mb={3}>
        Alerts to show
      </Title>
      <Checkbox label="News" color="news" />
      <Checkbox label="Survey" color="survey" />
      <Checkbox label="Score" color="score" />
      <Checkbox label="Promo" color="promo" />
    </Fragment>
  );
};

export default HomeSidebar;