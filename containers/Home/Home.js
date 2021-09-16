
import { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, selectDate } from 'actions/getNotifications';
import { Button, Card, CardContent, makeStyles } from '@material-ui/core';
import { Calendar } from 'components';
import _ from 'lodash';
import moment from 'moment';
import { Add } from '@material-ui/icons';
import LINKS from 'utils/constants/links';
import { useRouter } from 'next/router';
import { setPathTokens } from 'actions/auxiliary';

const useStyles = makeStyles(theme => ({
  newAlertButton: {
    backgroundColor: theme.palette.info.main,
    fontSize: 12,
    height: 35,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  }
}));

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const { selectedDate, all: { results: notifications } } = useSelector(state => state.notifications);
  const calendarCellData = useMemo(() => {
    const grouped = _.groupBy(notifications.map(n => ({
      ...n,
      date: moment(n.createdAt).format('YYYY-MM-DD')
    })), 'date');

    for (let date in grouped) {
      grouped[date] = grouped[date].reduce((acc, n) => ({
        ...acc,
        [n.type]: true,
      }), {});
    }

    return grouped;
  }, [notifications]);

  const handleDateChange = (date) => {
    dispatch(selectDate(date));
  };

  const handleCreateNewsAlert = () => {
    router.push(LINKS.NEWS.HREF)
  };

  useEffect(() => {
    dispatch(getNotifications());
    dispatch(setPathTokens([{ label: LINKS.HOME.TITLE }]));
  }, [dispatch])

  return (
    <Card>
      <CardContent>
        <Calendar
          value={selectedDate}
          cellData={calendarCellData}
          actions={
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              className={classes.newAlertButton}
              onClick={handleCreateNewsAlert}
            >
              News Alert
            </Button>
          }
          onChange={handleDateChange}
        />
      </CardContent>
    </Card>
  )
}

export default memo(Home)