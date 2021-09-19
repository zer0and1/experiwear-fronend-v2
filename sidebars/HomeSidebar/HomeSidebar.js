import { Fragment } from 'react';
import { CurrentGame } from './components';
import { Calendar, Timeline } from 'components';
import { useSelector } from 'react-redux';
import moment from 'moment';

const HomeSidebar = () => {
  const { selectedDate, notifications, cellData } = useSelector(({ notifications }) => {
    const { selectedDate, alertStatus, all: { results } } = notifications;
    return {
      selectedDate,
      cellData: alertStatus,
      notifications: results.filter(n => moment(n.createdAt).isSame(moment(selectedDate), 'day')),
    };
  });
  const { selectedGame } = useSelector(state => state.games);

  return selectedGame ? (
    <Fragment>
      <Calendar minimized={true} cellData={cellData} />
    </Fragment>
  ) : (
    <Fragment>
      <CurrentGame />
      <Timeline date={selectedDate} slots={notifications} />
    </Fragment>
  )
};

export default HomeSidebar;