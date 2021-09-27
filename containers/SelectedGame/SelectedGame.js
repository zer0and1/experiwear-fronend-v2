import { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from 'actions/getNotifications';
import { Button, Card, CardContent, CardHeader, makeStyles } from '@material-ui/core';
import { Timeline } from 'components';
import moment from 'moment';
import { Add } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { setPathTokens } from 'actions/auxiliary';
import { getEnglishDate, getEnglishDateWithTime } from 'utils/helpers/time';
import LINKS from 'utils/constants/links';

const useStyles = makeStyles(theme => ({
  newsAlertButton: {
    backgroundColor: theme.palette.info.main,
    fontSize: 12,
    height: 35,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  cardContent: {
  },
}));

const SelectedGame = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const { selectedDate, all: { results: notifications } } = useSelector(state => state.notifications);
  const slots = useMemo(() => notifications.filter(n => moment(n.createdAt).isSame(moment(selectedDate), 'day')), [notifications, selectedDate]);

  const handleCreateNewsAlert = () => {
    router.push(LINKS.NEWS.HREF);
  };

  useEffect(() => {
    dispatch(getNotifications());
    dispatch(setPathTokens([
      { path: LINKS.HOME.HREF, label: LINKS.HOME.TITLE },
      { path: LINKS.HOME.HREF, label: getEnglishDateWithTime(selectedDate) },
    ]));
  }, [dispatch, selectedDate]);

  return (
    <Card>
      <CardHeader
        title={`ALERT SCHEDULED FOR ${getEnglishDate(selectedDate)}`}
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            className={classes.newsAlertButton}
            onClick={handleCreateNewsAlert}
          >
            News Alert
          </Button>
        }
      />
      <CardContent className={classes.cardContent}>
        <Timeline detailView={true} slots={slots} />
      </CardContent>
    </Card>
  )
}

export default memo(SelectedGame)