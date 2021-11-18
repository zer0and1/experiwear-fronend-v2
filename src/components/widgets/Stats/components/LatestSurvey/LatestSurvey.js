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
import { DOUGHNUT_OPTIONS } from './constants';
import { ALERT_TYPES } from 'utils/constants/alert-types';
import CircleIcon from 'components/icons/CircleIcon';
import { calcPercent } from 'utils/helpers';

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
    latestSurvey: { yes = 0, no = 0, sent = 0 },
  } = useSelector((state) => state.notifications);
  const { selectedGame } = useSelector((state) => state.games);
  const totalAnswer = yes + no;
  const noResponse = sent - totalAnswer;
  const yesPercent = calcPercent(yes, sent);
  const noPercent = calcPercent(no, sent);
  const noResponsePercent = calcPercent(noResponse, sent);
  const chartColors = useMemo(
    () => [
      theme.palette.info.main,
      theme.palette.score.main,
      theme.palette.survey.main,
    ],
    [theme]
  );
  const chartData = useMemo(
    () => ({
      labels: ['Yes', 'No', 'No Response'],
      datasets: [
        {
          data: [yes, no, noResponse],
          backgroundColor: chartColors,
        },
      ],
    }),
    [yes, no, noResponse, chartColors]
  );

  useEffect(() => {
    dispatch(getLatestNotification(ALERT_TYPES.SURVEY.VALUE));
  }, [dispatch]);

  return (
    <Card className={classes.root}>
      <CardHeader
        title={selectedGame ? 'Latest Quick Poll' : 'Latest Survey'}
      />
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
              width={230}
              height={230}
            />
          </div>
          <div className={classes.footer}>
            <Box display="flex" alignItems="center" mb={2}>
              <CircleIcon color={theme.palette.info.main} />
              <Typography className={classes.label}>
                Yes ({yesPercent}%)
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CircleIcon color={theme.palette.score.main} />
              <Typography className={classes.label}>
                No ({noPercent}%)
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CircleIcon color={theme.palette.survey.main} />
              <Typography className={classes.label}>
                No response ({noResponsePercent}%)
              </Typography>
            </Box>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(LatestAlert);
