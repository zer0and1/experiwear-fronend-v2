import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TEMP_TEAM_HAWKS_SMALL_IMAGE_PATH } from "utils/constants/image-paths";
import { GameSelector, PathIndicator } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(6),
  },
}));

const AppBar = () => {
  const classes = useStyles();

  return (
    <Grid container justify="space-between" alignItems="center" className={classes.root}>
      <Grid item>
        <PathIndicator />
      </Grid>
      <Grid item>
        <img src={TEMP_TEAM_HAWKS_SMALL_IMAGE_PATH} width={38} height={40} />
      </Grid>
      <Grid item>
        <GameSelector />
      </Grid>
    </Grid>
  )
};

export default AppBar;