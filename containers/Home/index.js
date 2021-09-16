
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotifications } from 'actions/getNotifications';
import { Card, CardContent } from '@material-ui/core';
import { Calendar } from 'components';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch])

  return (
    <Card>
      <CardContent>
        <Calendar />
      </CardContent>
    </Card>
  )
}

export default memo(Home)