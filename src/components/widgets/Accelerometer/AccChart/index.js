import { makeStyles } from '@material-ui/core/styles';
import { LinearProgressWithLabel } from 'components';
import MagicAccAlert from 'components/parts/Card/MagicAccAlert';
import { memo, useState } from 'react';
import { Card, CardContent, withStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import range from 'utils/helpers/range';

const useStyles = makeStyles(() => ({
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  progressBarContainer: {
    margin: '30px',
  },
  progressBarContainerText: {
    marginBottom: '5px',
    textAlign: 'center',
  },
  progressBarContainerSubtext: {
    marginBottom: '5px',
    fontSize: '12px',
    color: '#999999',
    textAlign: 'center',
  },
}));

const StyledLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#CD2C31',
  },
}))(LinearProgressWithLabel);

const hackNumbers = (value) => (value < 10 ? value : (value * 10) / 65526 / 2); // toDo: remove once android/ios clients are fixed

const AccChart = ({ alertInstance }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const {
    accelerometerData: { results, total },
  } = useSelector((state) => state.accelerometer);

  const result = results[page - 1];

  if (!result && page !== 1) {
    setPage(1);
  }

  // const nFrames = result?.frames.length
  const accDataInitial = result?.frames?.map((i) => i.data).flat();
  const accData = accDataInitial?.slice(0, 30); // toDo: remove once android/ios clients are fixed

  let data = {};
  if (accData) {
    data = {
      labels: range(0, accData.length - 1, 50),
      datasets: [
        {
          label: 'x',
          data: accData.map((i) => hackNumbers(i[0])),
          fill: false,
          borderColor: 'rgb(188,19,19)',
          tension: 0.1,
        },
        {
          label: 'y',
          data: accData.map((i) => hackNumbers(i[1])),
          fill: false,
          borderColor: 'rgb(87,192,75)',
          tension: 0.1,
        },
        {
          label: 'z',
          data: accData.map((i) => hackNumbers(i[2])),
          fill: false,
          borderColor: 'rgb(9,88,224)',
          tension: 0.1,
        },
      ],
    };
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Card>
      <CardContent>
        {alertInstance ? (
          <>
            <MagicAccAlert item={alertInstance} />
            <Line data={data} />
            <div className={classes.paginationContainer}>
              <Pagination
                count={total}
                page={page}
                onChange={handleChange}
                variant="outlined"
                color="secondary"
              />
            </div>
            <div className={classes.progressBarContainer}>
              <div className={classes.progressBarContainerText}>
                Excitement Score
              </div>
              <div className={classes.progressBarContainerSubtext}>
                Represents the percentage of active Fanbands that responded with
                vigorous movements when this alert was triggered
              </div>
              <StyledLinearProgress
                variant="determinate"
                value={total}
                max={alertInstance.received}
              />
            </div>
          </>
        ) : (
          <>Please select alert first</>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(AccChart);
