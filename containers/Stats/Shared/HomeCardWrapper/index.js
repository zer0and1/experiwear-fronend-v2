import { memo } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    padding: `${theme.spacing(2)}px ${theme.spacing(3.5)}px !important`
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16
  },
}));

const HomeCardWrapper = ({
  title,
  subTitle,
  children
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <Typography color='textPrimary' className={classes.title}>
            {title}
          </Typography>
          {
            subTitle &&
            <Typography color='textSecondary' className={classes.subTitle}>
              {subTitle}
            </Typography>
          }
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default memo(HomeCardWrapper);
