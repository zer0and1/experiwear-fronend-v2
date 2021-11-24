import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, Container } from '@material-ui/core';
import { getEnglishDateWithTime } from 'utils/helpers';
import { ALERT_TYPES } from 'utils/constants';
import { createAlert } from 'redux/actions';
import { ScoreForm } from 'components';

const Score = () => {
  const dispatch = useDispatch();

  const handleCreate = async (data) => {
    await dispatch(createAlert(ALERT_TYPES.PROMO.VALUE, data));
  };

  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader
          title="Create Score Alert"
          subheader={getEnglishDateWithTime(new Date())}
        />
        <CardContent>
          <ScoreForm onCreate={handleCreate} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default memo(Score);
