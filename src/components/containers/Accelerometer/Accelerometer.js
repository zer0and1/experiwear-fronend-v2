import { memo } from 'react';
import { Card, CardContent, CardHeader, makeStyles } from '@material-ui/core';
import { AccChart, AlertContainer } from 'components';
import { useAsyncAction } from 'hooks';
import { getAccData } from 'redux/actions';
import { useSelector } from 'react-redux';
import { AccSlider } from './styled';

const useStyles = makeStyles((theme) => ({
  alert: {
    fontFamily: theme.custom.fonts.SFProTextSemibold,
    fontSize: 16,
    color: '#1e2022',
    marginBottom: 32,
  },
  score: {
    fontFamily: theme.custom.fonts.SFProTextSemibold,
    fontSize: 16,
    color: '#1e2022',
    marginBottom: 16,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#44444f',
    marginBottom: 10,
    textAlign: 'center',
  },
}));

const Accelerometer = () => {
  const classes = useStyles();
  const acc = useSelector((state) => state.notifications.acc.results);
  useAsyncAction(getAccData(), !acc.length);

  return (
    <AlertContainer maxWidth="md">
      <Card>
        <CardHeader title="Chart" />
        <CardContent>
          <p className={classes.alert}>News alert name</p>
          <AccChart mb={4} />
          <p className={classes.score}>Exitement Score</p>
          <p className={classes.desc}>
            Represents the percentage of active Fanbands that responded with
            vigorous movements when this alert was triggered
          </p>
          <AccSlider
            name="duration"
            valueLabelDisplay="on"
            min={1}
            max={20}
            step={1}
            marks={[
              { value: 1, label: '1s' },
              { value: 20, label: '20s' },
            ]}
            defaultValue={5}
          />
        </CardContent>
      </Card>
    </AlertContainer>
  );
};

export default memo(Accelerometer);
