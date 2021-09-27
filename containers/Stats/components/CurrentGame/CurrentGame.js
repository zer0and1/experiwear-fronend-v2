import { memo } from 'react';
import { Button, Card, CardContent, CardHeader, makeStyles } from '@material-ui/core';
import { Title } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    height: 210,
  },
  content: {

  },
  button: {
    borderRadius: theme.spacing(3),
    height: theme.spacing(6),
  },
}));

const CurrentGame = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={<Title>Current Game</Title>} />
      <CardContent className={classes.content}>
        <Button className={classes.button} color="primary" variant="contained" fullWidth>
          Select Gameday
        </Button>
      </CardContent>
    </Card>
  )
}

export default memo(CurrentGame);