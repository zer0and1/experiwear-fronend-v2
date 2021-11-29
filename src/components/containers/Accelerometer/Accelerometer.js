import { memo } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { AccChart, AlertContainer } from 'components';

const Accelerometer = () => {
  return (
    <AlertContainer maxWidth="md">
      <Card>
        <CardHeader title="Chart" />
        <CardContent>
          <AccChart />
        </CardContent>
      </Card>
    </AlertContainer>
  );
};

export default memo(Accelerometer);
