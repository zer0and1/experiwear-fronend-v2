import { Fragment, useMemo } from 'react';
import { Timeline, CurrentGame } from 'components';
import { useSelector } from 'react-redux';
import moment from 'moment';

const HomeSidebar = () => {
  const {
    selectedDate,
    all: { results: notifications },
  } = useSelector((state) => state.notifications);
  const slots = useMemo(
    () =>
      notifications.filter((n) =>
        moment(n.createdAt).isSame(moment(selectedDate), 'day')
      ),
    [notifications, selectedDate]
  );

  return (
    <Fragment>
      <CurrentGame />
      <Timeline date={selectedDate} slots={slots} />
    </Fragment>
  );
};

export default HomeSidebar;
