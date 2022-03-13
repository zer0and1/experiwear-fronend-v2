import { Fragment, useEffect } from 'react';
import { Calendar, ExpCheckbox, Title } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertToShow, setSelectedDate } from 'redux/actions';
import { useRouter } from 'next/router';
import { LINKS, ALERT_PROTO_TYPES, ALERT_PROTO_LABELS } from 'utils/constants';

const SelectedGameSidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    selectedDate,
    alertStatus: cellData,
    alertsToShow,
  } = useSelector((state) => state.notifications);
  const { selectedGame } = useSelector((state) => state.games);

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(date));
  };

  const handleVisibilityChange = (e) => {
    dispatch(setAlertToShow(e.target.name, e.target.checked));
  };

  useEffect(() => {
    selectedGame || router.push(LINKS.home.path);
  }, [selectedGame, router]);

  return (
    <Fragment>
      <Title mb={3}>Calendar</Title>
      <Calendar
        value={selectedDate}
        minimized={true}
        cellData={cellData}
        onChange={handleDateChange}
        mb={4}
      />
      <Title mb={3}>Alerts to show</Title>
      {Object.values(ALERT_PROTO_TYPES).map((type) => (
        <ExpCheckbox
          key={type}
          label={ALERT_PROTO_LABELS[type]}
          color={type}
          name={type}
          checked={alertsToShow[type]}
          onChange={handleVisibilityChange}
        />
      ))}
    </Fragment>
  );
};

export default SelectedGameSidebar;
