import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { getNotifications } from 'redux/actions/getNotifications';
import { ALERT_TYPES } from 'utils/constants/alert-types';
import { AlertItem, Title } from 'components';
import { Button } from '@material-ui/core';
import { LINKS } from 'utils/constants';
import { useAsyncAction } from 'hooks';

const useStyles = makeStyles((theme) => ({
  root: {},
  items: {
    overflow: 'auto',
    maxHeight: 320,
  },
  button: {
    borderRadius: theme.spacing(3),
    height: 50,
    marginTop: theme.spacing(2),
  },
}));

const NewsList = () => {
  const router = useRouter();
  const classes = useStyles();
  const alerts = useSelector((state) =>
    state.notifications.news.results.filter((n) => n.isSent)
  );

  const handleViewAll = useCallback(() => {
    router.push(LINKS.NEWS_ALERTS_SENT.HREF);
  }, [router]);

  useAsyncAction(getNotifications(ALERT_TYPES.NEWS.VALUE));

  return (
    <div className={classes.root}>
      <Title mb={4}>Survey Alerts Sent</Title>

      <div className={classes.items}>
        {alerts.map((item) => (
          <AlertItem key={item.id} data={item} mb={2} />
        ))}
      </div>

      <Button
        color="primary"
        variant="contained"
        fullWidth
        className={classes.button}
        onClick={handleViewAll}
      >
        View all
      </Button>
    </div>
  );
};

export default memo(NewsList);
