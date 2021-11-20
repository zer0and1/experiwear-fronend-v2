import { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

import { getLatestNotification } from 'redux/actions/getLatestNotification';
import { Title } from 'components';
import { DOUGHNUT_OPTIONS } from './constants';
import CircleIcon from 'components/icons/CircleIcon';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  footer: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  chart: {
    marginTop: theme.spacing(3),
    position: 'relative',
    height: 'fit-content',
  },
  chartLabel: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  sent: {
    fontFamily: theme.custom.fonts.SFUITextSemibold,
    fontSize: 36,
    color: '#394659',
  },
  total: {
    fontFamily: theme.custom.fonts.SFUITextRegular,
    fontSize: 16,
    color: '#cbd2d5',
  },
  label: {
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: 14,
    color: '#333',
    marginLeft: theme.spacing(3),
  },
}));

const LatestAlert = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const {
    latest: { received = 0, sent = 0 },
  } = useSelector((state) => state.notifications);
  const chartColors = useMemo(
    () => [theme.palette.promo.main, theme.palette.survey.main],
    [theme]
  );
  const chartData = useMemo(
    () => ({
      labels: [`Received`, `No Received`],
      datasets: [
        {
          data: [received, sent - received],
          backgroundColor: chartColors,
        },
      ],
    }),
    [received, sent, chartColors]
  );

  useEffect(() => {
    dispatch(getLatestNotification());
  }, [dispatch]);

  return (
    <Card className={classes.root}>
      <CardHeader title={<Title>Latest Alert</Title>} />
      <CardContent>
        <div className={classes.container}>
          <div className={classes.chart}>
            <div className={classes.chartLabel}>
              <Typography
                variant="body2"
                color="textPrimary"
                className={classes.sent}
              >
                {sent}
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary"
                className={classes.total}
              >
                Total
              </Typography>
            </div>
            <Doughnut
              data={chartData}
              options={DOUGHNUT_OPTIONS}
              width={200}
              height={200}
            />
          </div>
          <div className={classes.footer}>
            <Box display="flex" alignItems="center" mb={2}>
              <CircleIcon color={theme.palette.promo.main} />
              <Typography className={classes.label}>Received</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CircleIcon color={theme.palette.survey.main} />
              <Typography className={classes.label}>Not Received</Typography>
            </Box>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(LatestAlert);
