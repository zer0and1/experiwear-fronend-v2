import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TEMP_TEAM_HAWKS_SMALL_IMAGE_PATH } from 'utils/constants';
import { GameSelector, PathIndicator } from 'components';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(6),
  },
  mark: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const AppBar = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <PathIndicator />
      </Grid>
      <Grid item className={classes.mark}>
        <img src={TEMP_TEAM_HAWKS_SMALL_IMAGE_PATH} width={38} height={40} />
      </Grid>
      <Grid item>
        <GameSelector />
      </Grid>
    </Grid>
  );
};

export default AppBar;
