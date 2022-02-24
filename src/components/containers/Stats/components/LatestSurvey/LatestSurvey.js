import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
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

import { getLatestNotification } from 'redux/actions';
import { DOUGHNUT_OPTIONS } from './constants';
import { ALERT_PROTO_TYPES } from 'utils/constants';
import { CircleIcon } from 'components/icons';
import { calcPercent } from 'utils/helpers';
import { useAsyncAction } from 'hooks';

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
  const theme = useTheme();
  const {
    latestSurvey: { surveyResponses: responses = [], sent = 0 },
  } = useSelector((state) => state.notifications);
  const totalCount = useMemo(
    () => responses.reduce((acc, { count = 0 }) => acc + count, 0),
    [responses]
  );
  const responsePercent = useMemo(
    () =>
      responses
        .map(({ count = 0 }) => calcPercent(count, sent))
        .concat(calcPercent(sent - totalCount, sent)),
    [responses, totalCount, sent]
  );
  const labels = useMemo(
    () => responses.map(({ response }) => response).concat('No Response'),
    [responses]
  );

  const chartColors = useMemo(
    () => [
      theme.palette.info.main,
      theme.palette.promo.main,
      theme.palette.score.main,
    ],
    [theme]
  );
  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: responsePercent,
          backgroundColor: chartColors,
        },
      ],
    }),
    [labels, responsePercent, chartColors]
  );

  useAsyncAction(getLatestNotification(ALERT_PROTO_TYPES.survey));

  return (
    <Card className={classes.root}>
      <CardHeader title={'Latest Quick Poll'} />
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
            {labels.map((label, idx) => (
              <Box key={idx} display="flex" alignItems="center" mb={1}>
                <CircleIcon
                  color={
                    idx < label.length - 1
                      ? chartColors[idx % chartColors.length]
                      : theme.palette.survey.main
                  }
                />
                <Typography className={classes.label}>
                  {label} ({responsePercent[idx]}%)
                </Typography>
              </Box>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(LatestAlert);
