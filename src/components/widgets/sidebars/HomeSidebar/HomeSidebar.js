import { Fragment, useMemo } from 'react';
import { CurrentGame } from 'components';
import { Timeline } from 'components/elements';
import { useSelector } from 'react-redux';
import moment from 'moment';

const HomeSidebar = () => {
  const {
    selectedDate,
    all: { results: notifications },
    alertsToShow,
  } = useSelector((state) => state.notifications);
  const slots = useMemo(
    () =>
      notifications.filter(
        (n) =>
          moment(n.createdAt).isSame(
            moment(selectedDate || new Date()),
            'day'
          ) &&
          alertsToShow[n.type] &&
          n.isSent
      ),
    [notifications, selectedDate, alertsToShow]
  );

  return (
    <Fragment>
      <CurrentGame />
      <Timeline date={selectedDate || new Date()} slots={slots} />
    </Fragment>
  );
};

export default HomeSidebar;
