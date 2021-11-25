import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { getEnglishDateWithTime } from 'utils/helpers';
import { ALERT_TYPES } from 'utils/constants';
import { QuickPollForm, AlertContainer } from 'components';
import { createAlert } from 'redux/actions';

const QuickPoll = () => {
  const dispatch = useDispatch();

  const handleCreate = async (data) => {
    await dispatch(createAlert(ALERT_TYPES.QUICKPOLL.VALUE, data));
  };

  return (
    <AlertContainer maxWidth="md">
      <Card>
        <CardHeader
          title="Create Quick Poll Alert"
          subheader={getEnglishDateWithTime(new Date())}
        />
        <CardContent>
          <QuickPollForm onCreate={handleCreate} />
        </CardContent>
      </Card>
    </AlertContainer>
  );
};

export default memo(QuickPoll);
