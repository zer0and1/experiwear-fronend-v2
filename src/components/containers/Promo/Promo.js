import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, Container } from '@material-ui/core';
import { getEnglishDateWithTime } from 'utils/helpers';
import { ALERT_TYPES } from 'utils/constants';
import { PromoForm } from 'components';
import { createAlert } from 'redux/actions';

const Promo = () => {
  const dispatch = useDispatch();

  const handleCreate = async (data) => {
    await dispatch(createAlert(ALERT_TYPES.PROMO.VALUE, data));
  };

  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader
          title="Create Promo Alert"
          subheader={getEnglishDateWithTime(new Date())}
        />
        <CardContent>
          <PromoForm onCreate={handleCreate} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default memo(Promo);
