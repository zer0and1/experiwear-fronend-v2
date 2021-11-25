import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { createAlert } from 'redux/actions';
import { getEnglishDateWithTime } from 'utils/helpers';
import { NewsForm, AlertContainer } from 'components';
import { ALERT_TYPES } from 'utils/constants';

const News = () => {
  const dispatch = useDispatch();

  const handleCreate = async (data) => {
    await dispatch(createAlert(ALERT_TYPES.NEWS.VALUE, data));
  };

  return (
    <AlertContainer maxWidth="md">
      <Card>
        <CardHeader
          title="Create News Alert"
          subheader={getEnglishDateWithTime(new Date())}
        />
        <CardContent>
          <NewsForm onCreate={handleCreate} />
        </CardContent>
      </Card>
    </AlertContainer>
  );
};

export default memo(News);
