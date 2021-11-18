import moment from 'moment';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import MagicSurveyInfo from 'components/parts/Card/MagicSurveyInfo';
import MagicAlertStatus from 'components/parts/Card/MagicAlertStatus';
import { ANSWER_ENUM } from 'utils/constants/alert-types';
import { ALERT_IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';
import { calcPercent } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),
    borderBottom: `1px solid ${theme.custom.palette.lightGrey}`,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    minWidth: 42,
    width: 42,
    height: 42,
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
    marginRight: 20,
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.21)',
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
    borderLeft: `1px solid ${theme.custom.palette.lightGrey}`,
    [theme.breakpoints.down('md')]: {
      borderLeft: 'unset',
    },
  },
}));

const MagicSurveyAlert = ({ item }) => {
  const classes = useStyles();
  const {
    statistics: { total = 0 },
  } = useSelector((state) => state.fanbands);

  const filteredSurveyAnswers =
    item?.surveyAnswers?.filter((i) => i.answer !== ANSWER_ENUM.IGNORED) || [];
  const responseTimeArray = filteredSurveyAnswers.map((i) =>
    moment(i.createdAt).diff(moment(item.createdAt))
  );
  const responseTimeArraySorted = responseTimeArray.sort();

  const mid = Math.ceil(responseTimeArraySorted.length / 2);

  const responseTimeSum = responseTimeArraySorted.reduce(
    (prev, val) => prev + val,
    0
  );
  const avgAnswerTime = responseTimeSum / responseTimeArraySorted.length || 0;
  const mdAnswerTime =
    (responseTimeArraySorted.length % 2 === 0
      ? (responseTimeArraySorted[mid] + responseTimeArraySorted[mid - 1]) / 2
      : responseTimeArraySorted[mid - 1]) || 0;

  return (
    <div className={classes.item}>
      <div className={classes.leftContainer}>
        <img
          alt="news image"
          src={item.imageUrl || ALERT_IMAGE_PLACEHOLDER_IMAGE_PATH}
          className={classes.image}
        />
        <MagicSurveyInfo item={item} />
      </div>

      <div className={classes.rightContainer}>
        <MagicAlertStatus
          title="Sent:"
          value={item?.sent || 0}
          percent={calcPercent(item?.sent || 0, total)}
        />
        <MagicAlertStatus
          title="Open:"
          value={item?.received || 0}
          percent={calcPercent(item?.received || 0, item?.sent || 0)}
        />
        <MagicAlertStatus
          title="AVG:"
          value={`${moment.duration(avgAnswerTime).asSeconds().toFixed(2)}s`}
        />
        <MagicAlertStatus
          title="MD:"
          value={`${moment.duration(mdAnswerTime).asSeconds().toFixed(2)}s`}
        />
      </div>
    </div>
  );
};

export default memo(MagicSurveyAlert);
