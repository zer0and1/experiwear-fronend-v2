import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { getNotifications } from 'actions/getNotifications'
import { ALERT_TYPES } from 'utils/constants/alert-types'
import { AlertItem, Title } from 'components'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  items: {
  },
  button: {
    borderRadius: theme.spacing(3),
    height: 50,
    marginTop: theme.spacing(2),
  },
}));

const NewsList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [viewAll, setViewAll] = useState(false);
  const { news: { results } } = useSelector(state => state.notifications)
  const news = useMemo(() => {
    const alertsSent = results.filter(n => n.isSent);
    return viewAll ? alertsSent : alertsSent.slice(0, 4);
  }, [results, viewAll]);

  const handleViewAll = useCallback(() => {
    setViewAll(true);
  }, []);

  useEffect(() => {
    dispatch(getNotifications(ALERT_TYPES.NEWS.VALUE))
  }, [dispatch])

  return (
    <div className={classes.root}>
      <Title mb={4}>Survey Alerts Sent</Title>
      <div className={classes.items}>
        {news.map((item) => (
          <AlertItem key={item.id} data={item} mb={2} />
        ))}
      </div>
      {viewAll || (
        <Button color="primary" variant="contained" fullWidth className={classes.button} onClick={handleViewAll}>
          View all
        </Button>
      )}
    </div>
  );
};

export default memo(NewsList);