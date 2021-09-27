import { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicCheckbox from 'components/UI/MagicCheckbox'
import HomeCardWrapper from '../HomeCardWrapper'
import { ALERT_TYPES_ARRAY } from 'utils/constants/alert-types'
import { useRouter } from 'next/router'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    width: '100%'
  },
  description: {
    fontSize: 14,
    color: theme.custom.palette.grey,
    display: 'flex',
    width: '100%'
  },
  container: {
    width: 220,
    margin: theme.spacing(1.5)
  },
  item: {
    display: 'flex',
    cursor: 'pointer',
    marginBottom: theme.spacing(2)
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },
  button: {
    margin: theme.spacing(1)
  },
}));

const CreateBandAlert = () => {
  const classes = useStyles();
  const router = useRouter();

  const { all: { total } } = useSelector(state => state.notifications)
  const [page, setPage] = useState('');


  const goHandler = useCallback(() => {
    if (!!page) {
      router.push(page)
    }
  }, [router, page])

  const itemHandler = useCallback((href) => () => {
    setPage(href)
  }, [setPage])

  return (
    <HomeCardWrapper title='Create & Send Fanband Alert' >
      <Typography
        color='textPrimary'
        className={classes.title}
      >
        {total}
      </Typography>
      <Typography
        className={classes.description}
      >
        Alerts sent
      </Typography>
      <div className={classes.container}>
        {
          ALERT_TYPES_ARRAY.map((item, index) => (
            <div
              key={index}
              className={classes.item}
              onClick={itemHandler(item.HREF)}
            >
              <MagicCheckbox checked={page === item.HREF} />
              <Typography color='textSecondary'>
                {`${item.LABEL} Alert`}
              </Typography>
            </div>
          ))
        }

        <div
          className={classes.item}
          onClick={itemHandler(LINKS.SCHEDULE.HREF)}
        >
          <MagicCheckbox checked={page === LINKS.SCHEDULE.HREF} />
          <Typography color='textSecondary'>
            Schedule an Alert
          </Typography>
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <ContainedButton
          color='purple'
          className={classes.button}
          onClick={goHandler}
        >
          GO
        </ContainedButton>
      </div>
    </HomeCardWrapper>
  );
};

export default memo(CreateBandAlert);
