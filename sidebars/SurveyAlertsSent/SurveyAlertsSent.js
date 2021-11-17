import { memo, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router';

import { getNotifications } from 'actions/getNotifications'
import { ALERT_TYPES } from 'utils/constants/alert-types'
import { AlertItem, Title } from 'components'
import { Button } from '@material-ui/core'
import { LINKS } from 'utils/constants';
import { useAction } from 'utils/hooks';

const useStyles = makeStyles((theme) => ({
  root: {
  },
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

const SurveyList = () => {
  const router = useRouter();
  const classes = useStyles();
  const { survey: { results } } = useSelector(state => state.notifications)
  const survey = useMemo(() => results.filter(n => n.isSent), [results]);

  const handleViewAll = useCallback(() => {
    router.push(LINKS.QUICKPOLL_ALERTS_SENT.HREF);
  }, [router]);

  useAction(getNotifications(ALERT_TYPES.SURVEY.VALUE));

  return (
    <div className={classes.root}>
      <Title mb={4}>Survey Alerts Sent</Title>

      <div className={classes.items}>
        {survey.map((item) => (
          <AlertItem key={item.id} data={item} mb={2} />
        ))}
      </div>

      <Button color="primary" variant="contained" fullWidth className={classes.button} onClick={handleViewAll}>
        View all
      </Button>
    </div>
  );
};

export default memo(SurveyList);