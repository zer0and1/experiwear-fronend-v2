
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, selectDate } from 'actions/getNotifications';
import { Card, CardContent } from '@material-ui/core';
import { Calendar } from 'components';

const Home = () => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector(state => state.notifications);

  const handleDateChange = (date) => {
    dispatch(selectDate(date));
  };

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch])

  return (
    <Card>
      <CardContent>
        <Calendar value={selectedDate} onChange={handleDateChange} />
      </CardContent>
    </Card>
  )
}

export default memo(Home)